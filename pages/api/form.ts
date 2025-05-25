// pages/api/form.ts or app/api/form/route.ts (depending on your Next.js version)
import { NextApiRequest, NextApiResponse } from 'next/types';
import { Resend } from 'resend';
import { FormData, Labels } from '@/types/form';

const resend = new Resend(process.env.RESEND_API_KEY);

// Google reCAPTCHA verification function
async function verifyRecaptcha(token: string): Promise<boolean> {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
        console.error('RECAPTCHA_SECRET_KEY is not set');
        return false;
    }

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${secretKey}&response=${token}`,
        });

        const data = await response.json();
        return data.success && data.score > 0.5; // Adjust score threshold as needed
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return false;
    }
}

// Basic validation function
function validateFormData(data: FormData): { isValid: boolean; errors: Partial<Record<keyof FormData, string>> } {
    const errors: Partial<Record<keyof FormData, string>> = {};

    if (!data.firstname?.trim()) {
        errors.firstname = 'First name is required';
    }

    if (!data.lastname?.trim()) {
        errors.lastname = 'Last name is required';
    }

    if (!data.email?.trim()) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!data.message?.trim()) {
        errors.message = 'Message is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { data, labels, recaptchaToken } = req.body as {
            data: FormData;
            labels: Labels;
            recaptchaToken: string;
        };

        // Verify reCAPTCHA
        const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
        if (!isRecaptchaValid) {
            return res.status(400).json({ 
                message: 'reCAPTCHA verification failed',
                errors: {} 
            });
        }

        // Validate form data
        const validation = validateFormData(data);
        if (!validation.isValid) {
            return res.status(400).json({
                message: 'Form validation failed',
                errors: validation.errors
            });
        }

        // Send email using Resend
        const emailResult = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'contact@yourdomain.com',
            to: process.env.RESEND_TO_EMAIL || 'contact@yourdomain.com',
            subject: `New Contact Form Submission from ${data.firstname} ${data.lastname}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #555; margin-bottom: 5px;">Contact Information:</h3>
                        <p style="margin: 5px 0;"><strong>Name:</strong> ${data.firstname} ${data.lastname}</p>
                        <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                    </div>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #555; margin-bottom: 5px;">Message:</h3>
                        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007cba; margin: 10px 0;">
                            ${data.message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
                        <p>This email was sent from your website's contact form on ${new Date().toLocaleString()}.</p>
                    </div>
                </div>
            `,
            text: `New Contact Form Submission

Name: ${data.firstname} ${data.lastname}
Email: ${data.email}

Message:
${data.message}

Sent: ${new Date().toLocaleString()}`,
        });

        if (emailResult.error) {
            console.error('Resend error:', emailResult.error);
            return res.status(500).json({ 
                message: 'Failed to send email. Please try again later.',
                errors: {} 
            });
        }

        // Optional: Send confirmation email to the user
        if (process.env.RESEND_SEND_CONFIRMATION === 'true') {
            await resend.emails.send({
                from: process.env.RESEND_FROM_EMAIL || 'contact@yourdomain.com',
                to: data.email,
                subject: 'Thank you for contacting us',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Thank you for your message!</h2>
                        <p>Hi ${data.firstname},</p>
                        <p>We've received your message and will get back to you as soon as possible.</p>
                        
                        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007cba; margin: 20px 0;">
                            <h3 style="margin-top: 0;">Your message:</h3>
                            <p>${data.message.replace(/\n/g, '<br>')}</p>
                        </div>
                        
                        <p>Best regards,<br>Your Team</p>
                    </div>
                `,
                text: `Hi ${data.firstname},

We've received your message and will get back to you as soon as possible.

Your message:
${data.message}

Best regards,
Your Team`,
            });
        }

        return res.status(200).json({ 
            message: 'Message sent successfully! We\'ll get back to you soon.',
            success: true 
        });

    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({ 
            message: 'An unexpected error occurred. Please try again later.',
            errors: {} 
        });
    }
}