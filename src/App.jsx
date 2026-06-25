import { useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import { CaseStudy, Contact, Footer, Hero, Pricing, Process, Services } from './components/LandingSections';
import { content, getInitialLanguage } from './content';
import useGsapMotion, { useReveal } from './hooks/useGsapMotion';
import ColorBends from './ColorBends';

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
  const updateBackground = () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
let intensity = 1.5;

if (progress > 0.15) intensity = 1.35;
if (progress > 0.30) intensity = 1.20;
if (progress > 0.45) intensity = 1.05;
if (progress > 0.60) intensity = 0.90;
if (progress > 0.75) intensity = 0.75;
if (progress > 0.90) intensity = 0.60;

setBackgroundIntensity(intensity);
  };

  updateBackground();

  window.addEventListener('scroll', updateBackground, { passive: true });
  window.addEventListener('resize', updateBackground);

  return () => {
    window.removeEventListener('scroll', updateBackground);
    window.removeEventListener('resize', updateBackground);
  };
}, []);

  return (
    <div ref={rootRef} className="app-shell">
      <div className="site-background" aria-hidden="true">
        <ColorBends
          colors={['#d42020']}
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
