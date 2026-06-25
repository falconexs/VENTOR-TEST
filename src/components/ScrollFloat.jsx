import { useLayoutEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFloat({ children, id }) {
  const headingRef = useRef(null);
  const splitText = useMemo(() => children.split(/\s+/), [children]);

  useLayoutEffect(() => {
    const heading = headingRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!heading || reduceMotion) return undefined;

    const characters = heading.querySelectorAll('.float-char');
    const isMobile = window.innerWidth <= 680;
    const animation = gsap.fromTo(
      characters,
      {
        autoAlpha: 0,
        yPercent: isMobile ? 78 : 112,
        scaleY: isMobile ? 1.22 : 1.55,
        scaleX: isMobile ? 0.92 : 0.82,
        transformOrigin: '50% 0%',
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        duration: 0.85,
        stagger: isMobile ? 0.012 : 0.018,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 98%',
          end: 'top 70%',
          scrub: 0.4,
        },
      },
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [children]);

  return (
    <h2 ref={headingRef} className="scroll-float" id={id} aria-label={children}>
      <span className="float-text" aria-hidden="true">
        {splitText.map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`}>
            <span className="float-word">
              {Array.from(word).map((character, characterIndex) => (
                <span className="float-char" key={`${character}-${characterIndex}`}>{character}</span>
              ))}
            </span>
            {wordIndex < splitText.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </h2>
  );
}
