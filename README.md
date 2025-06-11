# Personal Portfolio

This is a personal portfolio website built by Daksh Thakran to showcase projects, skills, and provide a way to get in touch. It features a modern design, smooth animations powered by GSAP, interactive 3D elements using React Three Fiber, and is built with Next.js and TypeScript.

## ✨ Features

*   **Responsive Design**: Adapts to various screen sizes for a seamless experience on desktop and mobile devices.
*   **Smooth Animations & Transitions**: Utilizes GSAP (GreenSock Animation Platform) for engaging page transitions and element animations, including text effects and layout animations.
*   **Interactive 3D Models**: Showcases hobbies (Basketball, Headphones, Xbox Controller) using React Three Fiber and Drei, allowing users to interact with the models.
*   **Project Showcase**: Displays a curated list of personal projects with descriptions, images, and links to live demos or GitHub repositories.
*   **Contact Form**: Integrated contact form with Google reCAPTCHA v3 validation, sending emails via Resend.
*   **Internationalization (i18n)**: Supports multiple languages (English and French) using Next.js's built-in i18n routing.
*   **Theme Toggler**: Allows users to switch between dark and light modes, with styles managed via CSS variables and Next Themes.
*   **SEO Optimized**: Includes dynamic meta tags for better search engine visibility and automatically generates a sitemap on build.

## 🛠️ Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) 13
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [SCSS](https://sass-lang.com/) with CSS Modules
*   **Animation**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) (including Club GreenSock plugins like SplitText, CustomEase, ScrambleTextPlugin)
*   **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [Drei](https://github.com/pmndrs/drei)
*   **Form Handling**: [React Hook Form](https://react-hook-form.com/), [Yup](https://github.com/jquense/yup) for validation
*   **Email Service**: [Resend](https://resend.com/) (for contact form submissions)
*   **State Management**: React Context API
*   **Linting**: [ESLint](https://eslint.org/)
*   **Sitemap Generation**: [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)
*   **Captcha**: [Google reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)

## 📂 Project Structure

The project follows a standard Next.js structure with some key directories:

```
dakshh0827-portfolio/
├── components/         # Reusable UI components
│   ├── form/           # Contact form specific components
│   ├── models/         # 3D model components (React Three Fiber)
│   └── shared/         # Common UI elements (Button, GSAP wrappers, SVGs)
├── context/            # React Context for global state (navigation, transitions)
├── data/               # Static data (page content, translations, social links)
├── hooks/              # Custom React hooks (e.g., useWindowSize, useScrollbar)
├── pages/              # Next.js pages and API routes
│   └── api/            # API endpoints (e.g., contact form handler: /api/form)
├── public/             # Static assets (fonts, images, 3D models like .glb files)
├── schemas/            # Validation schemas for forms (Yup)
├── styles/             # SCSS stylesheets (global, modules, settings, utilities)
├── types/              # TypeScript type definitions
└── utils/              # Utility functions (email handling, string manipulation, etc.)
```

## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dakshh0827/Portfolio.git
    cd Portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Then, fill in the required values in your `.env` file. The primary contact form (`pages/api/form.ts`) uses Resend. You will need to add/update the following variables:

    ```env
    # --- Mandatory for Core Functionality ---
    # Global
    NEXT_PUBLIC_BASE_URL=http://localhost:3000 # Your development (http://localhost:3000) or deployment URL
    NEXT_PUBLIC_SITE_NAME="Daksh Thakran"      # Your site name

    # Google reCAPTCHA v3 (for contact form)
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_google_recaptcha_v3_site_key
    RECAPTCHA_SECRET_KEY=your_google_recaptcha_v3_secret_key

    # --- Mandatory for Contact Form (Resend) ---
    # These are used by pages/api/form.ts
    RESEND_API_KEY=your_resend_api_key
    RESEND_FROM_EMAIL=your_verified_resend_from_email@example.com # Email verified with Resend
    RESEND_TO_EMAIL=your_email_to_receive_messages@example.com

    # --- Optional or for alternative configurations (SendGrid) ---
    # These are defined in .env.example and utils/email.ts but not used by the primary contact form
    # EMAIL_FROM=
    # SENDGRID_API_KEY=
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

In the project directory, you can run:

*   `npm run dev` or `yarn dev`:
    Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
*   `npm run build` or `yarn build`:
    Builds the app for production to the `.next` folder.
*   `npm run start` or `yarn start`:
    Starts the production server (requires a prior build).
*   `npm run lint` or `yarn lint`:
    Runs ESLint to check for code quality and style issues.
*   `npm run postbuild` or `yarn postbuild`:
    Generates the `sitemap.xml` and `robots.txt` files. This script is automatically run by Next.js after the `build` script completes.

## Club GreenSock Plugins

This project utilizes premium GSAP plugins such as `SplitText`, `CustomEase`, and `ScrambleTextPlugin`.
To use these plugins, you need a Club GreenSock membership.
The `.npmrc` file is configured to fetch these from GreenSock's private NPM registry:
```
//npm.greensock.com/:_authToken=${NPM_TOKEN}
@gsap:registry=https://npm.greensock.com
```
You will need to replace `${NPM_TOKEN}` with your actual GreenSock NPM token, typically by setting it as an environment variable named `NPM_TOKEN` that your `npm install` or `yarn install` process can access. For more details, refer to the [GreenSock NPM installation guide](https://gsap.com/docs/v3/Installation/?tab=npm&module=esm&method= secretário#club).

If you do not have a Club GreenSock membership, you might encounter issues resolving these premium plugins during installation or building the project.
