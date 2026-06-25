import { useEffect, useState } from 'react';
import Brand from './Brand';

export default function Header({ language, text, onLanguageChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} id="top">
      <div className="header-shell">
        <Brand homeLabel={text.accessibility.home} subtitle={text.brandLabel} />

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? text.accessibility.closeMenu : text.accessibility.openMenu}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} id="site-nav" aria-label={text.accessibility.navigation}>
          <div className="nav-links">
            <a href="#work" onClick={closeMenu}>{text.nav.work}</a>
            <a href="#services" onClick={closeMenu}>{text.nav.services}</a>
            <a href="#process" onClick={closeMenu}>{text.nav.process}</a>
            <a href="#contact" onClick={closeMenu}>{text.nav.contact}</a>
          </div>

          <div className="nav-actions">
            <button className="language-toggle" type="button" aria-label={text.accessibility.toggleLanguage} onClick={onLanguageChange}>
              <span className={language === 'en' ? 'is-active' : ''}>EN</span>
              <i aria-hidden="true" />
              <span className={language === 'ru' ? 'is-active' : ''}>RU</span>
            </button>
            <a className="nav-button" href="#contact" onClick={closeMenu}>
              {text.nav.cta}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
