import { useState } from 'react';
import Brand from './Brand';
import LiquidGlass from './LiquidGlass';
import ScrollFloat from './ScrollFloat';

export function Hero({ text }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow hero-load-item">{text.hero.eyebrow}</p>
          <h1 className="hero-load-item" id="hero-title">{text.hero.title}</h1>
          <p className="hero-lead hero-load-item">{text.hero.lead}</p>

          <div className="hero-actions hero-load-item" aria-label={text.accessibility.heroActions}>
            <a className="button primary" href="#contact">{text.hero.primary}<span aria-hidden="true">↗</span></a>
            <a className="button secondary" href="#work">{text.hero.secondary}<span aria-hidden="true">↓</span></a>
          </div>

          <p className="hero-context hero-load-item">{text.hero.context}</p>
        </div>

        <LiquidGlass as="aside" className="hero-note hero-load-item" aria-label={text.accessibility.heroNote}>
          <span className="hero-note__label">{text.hero.noteLabel}</span>
          <p>{text.hero.noteItems.map((item) => <span className="note-line" key={item}>{item}</span>)}</p>
          <small className="hero-note__price">{text.hero.notePrice}</small>
        </LiquidGlass>
      </div>
    </section>
  );
}

export function Services({ text }) {
  return (
    <section className="section focus-section reveal" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-intro focus-intro">
          <div>
            <p className="eyebrow">{text.services.eyebrow}</p>
            <h2 id="services-title">{text.services.title}</h2>
          </div>
          <p>{text.services.lead}</p>
        </div>

        <div className="focus-grid">
          {text.services.items.map((item, index) => (
            <article className="focus-card reveal" key={item.title}>
              <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseStudy({ text }) {
  return (
    <section className="section examples-section" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="section-intro compact-intro">
          <div>
            <p className="eyebrow">{text.caseStudy.eyebrow}</p>
            <ScrollFloat id="work-title">{text.caseStudy.title}</ScrollFloat>
          </div>
          <p>{text.caseStudy.lead}</p>
        </div>

        <div className="example-grid">
          <article className="example-card case-card motion-card">
            <span className="motion-card-line" aria-hidden="true" />
            <div className="example-meta"><span>01 / LIVE</span><p>{text.caseStudy.meta}</p></div>
            <h3>{text.caseStudy.heading}</h3>
            <p className="case-summary">{text.caseStudy.summary}</p>

            <div className="case-journey">
              {text.caseStudy.stages.map((stage) => (
                <div className="case-stage" key={stage.label}>
                  <span>{stage.label}</span>
                  <p>{stage.text}</p>
                </div>
              ))}
            </div>

            <a href="https://afkvitko.notariat.ru" target="_blank" rel="noopener noreferrer" aria-label={text.accessibility.caseLink}>
              {text.caseStudy.link} <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Process({ text }) {
  return (
    <section className="section process-section reveal" id="process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-intro compact-intro">
          <div>
            <p className="eyebrow">{text.process.eyebrow}</p>
            <h2 id="process-title">{text.process.title}</h2>
          </div>
          <p>{text.process.lead}</p>
        </div>

        <ol className="process-timeline process-five">
          {text.process.steps.map((step, index) => (
            <li className="process-step motion-step" key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Pricing({ text }) {
  return (
    <section className="section range-section motion-range" id="range" aria-labelledby="range-title">
      <div className="container">
        <div className="range-heading">
          <div>
            <p className="eyebrow">{text.pricing.eyebrow}</p>
            <h2 id="range-title">{text.pricing.title}</h2>
          </div>

          <LiquidGlass className="range-signal motion-price">
            <span className="range-signal__label">{text.pricing.signalLabel}</span>
            <strong data-price-reveal>{text.pricing.signalPrice}</strong>
            <p className="range-signal__note">{text.pricing.signalNote}</p>
          </LiquidGlass>
        </div>

        <p className="range-lead">{text.pricing.lead}</p>

        <div className="range-grid">
          {text.pricing.packages.map((item) => (
            <article className="range-card motion-range-card" key={item.code}>
              <span>{item.code}</span>
              <h3>{item.title}</h3>
              <strong className="package-price">{item.price}</strong>
              <p>{item.text}</p>
              <ul className="package-list">
                {item.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact({ text, language }) {
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const contact = String(formData.get('contact') || '').trim();
    const request = String(formData.get('request') || '').trim();

    const message = language === 'ru'
      ? `Имя: ${name}\nКонтакт: ${contact}\n\nЗадача:\n${request}`
      : `Name: ${name}\nContact: ${contact}\n\nProject brief:\n${request}`;

    const mailto = new URL('mailto:ventordigital@gmail.com');
    mailto.searchParams.set('subject', text.contact.emailSubject);
    mailto.searchParams.set('body', message);

    window.location.href = mailto.toString();
    setStatus(text.contact.success);
  };

  return (
    <section className="contact-section motion-contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">{text.contact.eyebrow}</p>
          <ScrollFloat id="contact-title">{text.contact.title}</ScrollFloat>
          <p>{text.contact.lead}</p>

          <div className="contact-promise">
            <strong>{text.contact.promise}</strong>
            <span>{text.contact.promiseNote}</span>
          </div>

          <div className="contact-direct">
            <span>{text.contact.direct}</span>
            <a href="mailto:ventordigital@gmail.com">ventordigital@gmail.com <i aria-hidden="true">↗</i></a>
            <a href="https://t.me/ventordigital" target="_blank" rel="noopener noreferrer">Telegram <i aria-hidden="true">↗</i></a>
          </div>
        </div>

        <LiquidGlass as="form" className="contact-form liquid-glass-form" action="#" method="post" noValidate onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">{text.contact.name}</label>
            <input id="name" name="name" type="text" autoComplete="name" placeholder={text.contact.namePlaceholder} required />
          </div>

          <div className="form-row">
            <label htmlFor="contact-method">{text.contact.contact}</label>
            <input id="contact-method" name="contact" type="text" autoComplete="email" placeholder={text.contact.contactPlaceholder} required />
          </div>

          <div className="form-row">
            <label htmlFor="request">{text.contact.request}</label>
            <textarea id="request" name="request" rows="5" placeholder={text.contact.requestPlaceholder} required />
          </div>

          <button className="button primary form-submit" type="submit">{text.contact.submit}<span aria-hidden="true">↗</span></button>
          <p className={`form-status${status ? ' is-visible' : ''}`} role="status" aria-live="polite">{status}</p>
        </LiquidGlass>
      </div>
    </section>
  );
}

export function Footer({ text }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand homeLabel={text.accessibility.home} subtitle={text.brandLabel} />
          <p>{text.footer.description}</p>
        </div>

        <nav className="footer-nav" aria-label={text.accessibility.footerNavigation}>
          <span>{text.footer.navigate}</span>
          <a href="#work">{text.nav.work}</a>
          <a href="#services">{text.nav.services}</a>
          <a href="#process">{text.nav.process}</a>
          <a href="#contact">{text.nav.contact}</a>
        </nav>

        <div className="footer-contact">
          <span>{text.nav.contact}</span>
          <a href="mailto:ventordigital@gmail.com">{text.footer.email}</a>
          <a href="https://t.me/ventordigital" target="_blank" rel="noopener noreferrer">Telegram</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 Ventor Digital</p>
        <a href="#top">{text.footer.back} <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}