import { useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import { CaseStudy, Contact, Footer, Hero, Pricing, Process, Services } from './components/LandingSections';
import { content, getInitialLanguage } from './content';
import useGsapMotion, { useReveal } from './hooks/useGsapMotion';
import ColorBends from './ColorBends';

const VENTOR_BEND_COLORS = ['#d42020'];
const BACKGROUND_INTENSITY_STOPS = [
  { selector: '.hero', intensity: 1.5 },
  { selector: '#services', intensity: 1.35 },
  { selector: '#work', intensity: 1.2 },
  { selector: '#process', intensity: 1 },
  { selector: '#range', intensity: 0.75 },
  { selector: '#contact', intensity: 0.68 }
];

function setMetaContent(selector, value) {
  document.querySelector(selector)?.setAttribute('content', value);
}

export default function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const rootRef = useRef(null);
  const text = useMemo(() => content[language], [language]);
  const [backgroundIntensity, setBackgroundIntensity] = useState(1.5);

  useGsapMotion(rootRef, language);
  useReveal(rootRef, language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.body.classList.toggle('lang-ru', language === 'ru');
    document.title = text.meta.title;
    setMetaContent('meta[name="description"]', text.meta.description);
    setMetaContent('meta[property="og:title"]', text.meta.socialTitle);
    setMetaContent('meta[property="og:description"]', text.meta.socialDescription);
    setMetaContent('meta[name="twitter:title"]', text.meta.socialTitle);
    setMetaContent('meta[name="twitter:description"]', text.meta.socialDescription);

    try {
      window.localStorage.setItem('ventor-language-v2', language);
    } catch {
      // The language still works when browser storage is unavailable.
    }
  }, [language, text]);

  useEffect(() => {
    let frameId = 0;

    const updateBackground = () => {
      const viewportAnchor = window.innerHeight * 0.42;
      let nextIntensity = BACKGROUND_INTENSITY_STOPS[0].intensity;

      BACKGROUND_INTENSITY_STOPS.forEach(({ selector, intensity }) => {
        const section = document.querySelector(selector);
        if (section && section.getBoundingClientRect().top <= viewportAnchor) {
          nextIntensity = intensity;
        }
      });

      setBackgroundIntensity((currentIntensity) => (
        currentIntensity === nextIntensity ? currentIntensity : nextIntensity
      ));
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateBackground();
      });
    };

    updateBackground();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <div ref={rootRef} className="app-shell">
      <div className="site-background" aria-hidden="true">
        <ColorBends
          colors={VENTOR_BEND_COLORS}
          rotation={90}
          autoRotate={0}
          speed={0.2}
          scale={1.8}
          frequency={1}
          warpStrength={1}
          mouseInfluence={0}
          parallax={0}
          noise={0.28}
          iterations={1}
          intensity={backgroundIntensity}
          bandWidth={6}
          transparent
        />
      </div>

      <div className="site-content">
        <a className="skip-link" href="#main">{text.accessibility.skip}</a>

        <Header
          language={language}
          text={text}
          onLanguageChange={() => setLanguage((value) => (value === 'ru' ? 'en' : 'ru'))}
        />

        <div className="motion-rail" aria-hidden="true"><span /><i /></div>

        <main id="main">
          <Hero text={text} />
          <Services text={text} />
          <CaseStudy text={text} />
          <Process text={text} />
          <Pricing text={text} />
          <Contact text={text} language={language} />
        </main>

        <Footer text={text} />
      </div>
    </div>
  );
}
