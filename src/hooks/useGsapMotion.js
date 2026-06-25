import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useGsapMotion(rootRef, dependency) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const body = document.body;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    body.classList.toggle('motion-reduced', reduceMotion);

    if (reduceMotion) {
      body.classList.add('is-ready');
      return () => body.classList.remove('motion-reduced', 'is-ready');
    }

    body.classList.add('gsap-ready');
    body.classList.remove('is-ready');

    const context = gsap.context(() => {
      const heroItems = root.querySelectorAll('.hero-load-item');
      const heroBeam = root.querySelector('.hero-beam');

      gsap.set(heroItems, { autoAlpha: 0, y: 24 });

      const heroIntro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (heroBeam) {
        gsap.set(heroBeam, { scaleX: 0, autoAlpha: 0, transformOrigin: '0% 50%' });
        heroIntro.to(heroBeam, { scaleX: 1, autoAlpha: 0.68, duration: 1.25, ease: 'power3.inOut' });
      }
      heroIntro.to(heroItems, { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.075 }, heroBeam ? '-=0.86' : 0);

      if (heroBeam) {
        gsap.to(heroBeam, {
          autoAlpha: 0.8,
          boxShadow: '0 0 10px rgba(255, 31, 31, 0.78), 0 0 30px rgba(255, 31, 31, 0.42), 0 0 70px rgba(255, 31, 31, 0.2)',
          duration: 2.8,
          delay: 1.45,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      const rail = root.querySelector('.motion-rail');
      const railProgress = rail?.querySelector('span');
      const railNode = rail?.querySelector('i');

      if (rail && railProgress && railNode) {
        gsap.set(railProgress, { scaleY: 0, transformOrigin: '50% 0%' });
        gsap.to(railProgress, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.35 },
        });
        gsap.to(railNode, {
          y: () => Math.max(0, rail.clientHeight - railNode.offsetHeight),
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.35, invalidateOnRefresh: true },
        });
      }

      root.querySelectorAll('.motion-card').forEach((card) => {
        const line = card.querySelector('.motion-card-line');
        const cardContent = Array.from(card.children).filter((element) => element !== line);
        gsap.set(card, { autoAlpha: 0, y: 34 });
        gsap.set(cardContent, { autoAlpha: 0, y: 15 });
        if (line) gsap.set(line, { scaleX: 0, transformOrigin: '0% 50%' });

        gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 93%', once: true } })
          .to(card, { autoAlpha: 1, y: 0, duration: 0.62, ease: 'power3.out' })
          .to(line, { scaleX: 1, duration: 0.72, ease: 'power3.inOut' }, '<0.04')
          .to(cardContent, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.06, ease: 'power2.out' }, '<0.18');
      });

      const processTimeline = root.querySelector('.process-timeline');
      const processSteps = processTimeline ? Array.from(processTimeline.querySelectorAll('.motion-step')) : [];
      if (processTimeline && processSteps.length) {
        gsap.set(processTimeline, { '--process-progress': 0 });
        gsap.set(processSteps, { autoAlpha: 0.66, y: 12 });
        gsap.set(processSteps.map((step) => step.querySelector('span')), { scale: 0.92 });

        const timeline = gsap.timeline({
          scrollTrigger: { trigger: processTimeline, start: 'top 88%', end: 'bottom 52%', scrub: 0.65 },
        });
        timeline.to(processTimeline, { '--process-progress': 1, duration: 1, ease: 'none' }, 0);
        processSteps.forEach((step, index) => {
          const dot = step.querySelector('span');
          const position = index * 0.18;
          timeline
            .to(step, { autoAlpha: 1, y: 0, duration: 0.16, ease: 'power2.out' }, position)
            .to(dot, {
              scale: 1,
              backgroundColor: '#ff1f1f',
              borderColor: '#ff1f1f',
              boxShadow: '0 0 0 7px rgba(4, 4, 4, 0.48), 0 0 0 8px rgba(255, 31, 31, 0.2), 0 0 30px rgba(255, 31, 31, 0.44)',
              duration: 0.14,
            }, position);
        });
      }

      const rangeSection = root.querySelector('.motion-range');
      const rangeSignal = rangeSection?.querySelector('.motion-price');
      const price = rangeSection?.querySelector('[data-price-reveal]');
      const priceLabel = rangeSignal?.querySelector('.range-signal__label');
      const priceNote = rangeSignal?.querySelector('.range-signal__note');
      const rangeLead = rangeSection?.querySelector('.range-lead');
      const rangeCards = rangeSection ? Array.from(rangeSection.querySelectorAll('.motion-range-card')) : [];
      if (rangeSection && rangeSignal && price && priceLabel && priceNote) {
        gsap.set(rangeSignal, { '--price-line': 0 });
        gsap.set(price, { autoAlpha: 0, yPercent: 26, clipPath: 'inset(0 100% 0 0)' });
        gsap.set([priceLabel, priceNote, rangeLead], { autoAlpha: 0, y: 12 });
        gsap.set(rangeCards, { autoAlpha: 0, y: 28 });

        gsap.timeline({ scrollTrigger: { trigger: rangeSection, start: 'top 84%', once: true } })
          .to(rangeSignal, { '--price-line': 1, duration: 0.48, ease: 'power2.inOut' })
          .to([priceLabel, priceNote], { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 }, '<0.08')
          .to(price, { autoAlpha: 1, yPercent: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.78, ease: 'power3.out' }, '<0.03')
          .to(rangeLead, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '<0.18')
          .to(rangeCards, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.08, ease: 'power3.out' }, '<0.14');
      }

      const contactSection = root.querySelector('.motion-contact');
      const contactBeam = contactSection?.querySelector('.contact-beam');
      const contactForm = contactSection?.querySelector('.contact-form');
      const contactCopy = contactSection?.querySelectorAll('.contact-copy > .eyebrow, .contact-copy > p, .contact-promise, .contact-direct');
      const formParts = contactForm?.querySelectorAll('.form-row, .form-submit');
      if (contactSection && contactBeam && contactForm) {
        gsap.set(contactBeam, { scaleX: 0, autoAlpha: 0, transformOrigin: '0% 50%' });
        gsap.set(contactForm, { autoAlpha: 0, y: 34, '--form-line': 0 });
        gsap.set(contactCopy, { autoAlpha: 0, y: 16 });
        gsap.set(formParts, { autoAlpha: 0, y: 12 });

        gsap.to(contactBeam, {
          scaleX: 1,
          autoAlpha: 0.82,
          ease: 'none',
          scrollTrigger: { trigger: contactSection, start: 'top 88%', end: 'top 50%', scrub: 0.7 },
        });

        gsap.timeline({ scrollTrigger: { trigger: contactSection, start: 'top 72%', once: true } })
          .to(contactCopy, { autoAlpha: 1, y: 0, duration: 0.52, stagger: 0.08, ease: 'power2.out' })
          .to(contactForm, { autoAlpha: 1, y: 0, duration: 0.66, ease: 'power3.out' }, '<0.12')
          .to(contactForm, { '--form-line': 1, duration: 0.62, ease: 'power3.inOut' }, '<0.06')
          .to(formParts, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.07, ease: 'power2.out' }, '<0.18');
      }
    }, root);

    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(frame);
      context.revert();
      body.classList.remove('gsap-ready', 'motion-reduced', 'is-ready');
    };
  }, [rootRef, dependency]);
}

export function useReveal(rootRef, dependency) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const elements = root.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [rootRef, dependency]);
}
