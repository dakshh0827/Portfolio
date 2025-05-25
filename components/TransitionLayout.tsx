import type { TransitionLayout } from '@/types/components/global';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import useTransitionContext from '@/context/transitionContext';
import useNavigationContext from '@/context/navigationContext';
import { useState } from 'react';
import { useRouter } from 'next/router'; 
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export default function TransitionLayout({
  children
}: TransitionLayout) {
  const router = useRouter();
  const [displayChildren, setDisplayChildren] = useState(children);
  const { timeline, resetTimeline, primaryEase, footerRef } = useTransitionContext();
  const { navigationRef, setCurrentRoute, currentRoute } = useNavigationContext();

  const animateNavigation = () => {
    gsap.fromTo(
      navigationRef.current,
      { y: '-100%' },
      {
        opacity: 1,
        y: 0,
        willChange: 'transform',
        ease: primaryEase,
        delay: 1,
        duration: 1.25
      }
    );

    timeline?.add(
      gsap.to(navigationRef.current, {
        opacity: 0,
        ease: primaryEase,
        duration: 0.35
      }),
      0
    );
  };

  const animateFooter = () => {
    gsap.to(footerRef.current, {
      opacity: 1,
      ease: primaryEase,
      duration: 1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom',
        end: 'bottom top'
      }
    });

    timeline?.add(
      gsap.to(footerRef.current, {
        opacity: 0,
        ease: primaryEase,
        duration: 0.35
      }),
      0
    );
  };

  useIsomorphicLayoutEffect(() => {
    const path = router.asPath.split('?')[0];

    if (currentRoute !== path) {
      if (timeline?.duration() === 0) {
        setDisplayChildren(children);
        animateNavigation();
        animateFooter();
        setCurrentRoute(path);
        window.scrollTo(0, 0);
        ScrollTrigger.refresh(true);
        return;
      }

      timeline?.play().then(() => {
        resetTimeline();
        setDisplayChildren(children);
        animateNavigation();
        animateFooter();
        setCurrentRoute(path);
        window.scrollTo(0, 0);
        ScrollTrigger.refresh(true);
        document.documentElement.classList.remove('is-transitioning');
      });
    } else {
      setCurrentRoute(path);
      ScrollTrigger.refresh(true);
    }
  }, [router.asPath]);

  return (
    <div className="u-overflow--hidden">
      {displayChildren}
    </div>
  );
}
