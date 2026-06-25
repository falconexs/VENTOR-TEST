const body = document.body;
const header = document.querySelector('.site-header');
const siteNav = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const languageToggle = document.querySelector('.language-toggle');
const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');
const gsapReady = Boolean(window.gsap && window.ScrollTrigger);
const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionEnabled = gsapReady && !reduceMotionQuery.matches;

if (gsapReady) {
  window.gsap.registerPlugin(window.ScrollTrigger);
  body.classList.add('gsap-ready');
}

body.classList.toggle('motion-reduced', reduceMotionQuery.matches);

const ruTranslations = Object.freeze({
  'Skip to content': 'Перейти к содержимому',
  'Web Studio': 'Веб-студия',
  Work: 'Работы',
  Services: 'Услуги',
  Process: 'Процесс',
  Contact: 'Контакты',
  'Discuss a project': 'Обсудить проект',
  'Clean websites for private clients and small businesses.':
    'Чистые сайты для частных клиентов и малого бизнеса.',
  'Ventor Digital creates simple, modern and responsive websites that help a project look clearer, stronger and more professional online.':
    'Ventor Digital создаёт простые, современные и адаптивные сайты, которые помогают проекту выглядеть понятнее, сильнее и профессиональнее онлайн.',
  'Discuss a website': 'Обсудить сайт',
  'View work': 'Смотреть работы',
  'Small websites and landing pages. Clear scope, clean design, basic launch setup.':
    'Небольшие сайты и лендинги. Понятный объём, чистый дизайн и базовая подготовка к запуску.',
  'Small projects / 2026': 'Небольшие проекты / 2026',
  'Landing pages.': 'Лендинги.',
  'Business websites.': 'Сайты для бизнеса.',
  'Personal pages.': 'Личные страницы.',
  'What we make': 'Что мы создаём',
  'Simple digital work for clients who need a clear and professional online presence.':
    'Понятная цифровая работа для клиентов, которым нужно аккуратное и профессиональное присутствие онлайн.',
  'Landing pages': 'Лендинги',
  'Focused one-page websites for offers, personal brands, small businesses and launches.':
    'Сфокусированные одностраничные сайты для предложений, личных брендов, малого бизнеса и запусков.',
  'Business websites': 'Сайты для бизнеса',
  'Clean multi-section websites that explain the company, show services and make it easy to contact.':
    'Чистые многораздельные сайты, которые рассказывают о компании, показывают услуги и упрощают связь.',
  'Personal / expert pages': 'Личные страницы / сайты экспертов',
  'Web pages for specialists, founders and private clients who need a stronger online presentation.':
    'Веб-страницы для специалистов, основателей и частных клиентов, которым нужна более сильная онлайн-презентация.',
  'Work examples': 'Примеры работ',
  'A few examples of websites and digital projects connected to Ventor’s current work.':
    'Несколько примеров сайтов и цифровых проектов, связанных с текущей работой Ventor.',
  'Official website / client work': 'Официальный сайт / работа для клиента',
  'Notary office website': 'Сайт нотариальной конторы',
  'A simple official website for a notary office, focused on clear information, professional presentation and easy access to contacts.':
    'Простой официальный сайт нотариальной конторы с понятной информацией, профессиональной подачей и быстрым доступом к контактам.',
  'Visit website': 'Открыть сайт',
  'How the work goes': 'Как проходит работа',
  'A simple process for small website projects.': 'Простой процесс для небольших сайтов.',
  Discussion: 'Обсуждение',
  'We discuss the project, goal, references, structure and what the website needs to include.':
    'Обсуждаем проект, цель, референсы, структуру и то, что должно быть на сайте.',
  Structure: 'Структура',
  'We outline the sections, content, pages, CTA and basic user flow.':
    'Определяем разделы, контент, страницы, кнопки и базовый путь пользователя.',
  Design: 'Дизайн',
  'We create the visual direction and adapt it to the client’s style and task.':
    'Создаём визуальное направление и адаптируем его под стиль и задачу клиента.',
  Build: 'Разработка',
  'We develop the responsive website and prepare it for launch.':
    'Разрабатываем адаптивный сайт и готовим его к запуску.',
  Launch: 'Запуск',
  'We connect the domain or deployment, check mobile layout and prepare basic SEO and social preview.':
    'Подключаем домен или публикацию, проверяем мобильную версию и готовим базовые настройки для поиска и превью для соцсетей.',
  'Project range': 'Диапазон проектов',
  'Clear scope before the work starts.': 'Понятный объём до начала работы.',
  'Typical small website projects': 'Типичный диапазон небольших сайтов',
  'Final price depends on scope.': 'Итоговая цена зависит от объёма.',
  'Most projects are estimated individually after a short discussion. The range depends on structure, number of sections, design complexity and launch requirements.':
    'Большинство проектов оценивается индивидуально после короткого обсуждения. Цена зависит от структуры, количества разделов, сложности дизайна и требований к запуску.',
  'Simple landing page': 'Простой лендинг',
  'For a focused one-page website or personal and business presentation.':
    'Для сфокусированного одностраничного сайта или личной и бизнес-презентации.',
  'Small business website': 'Сайт малого бизнеса',
  'For a company website with several sections, contact flow and basic responsive layout.':
    'Для сайта компании с несколькими разделами, понятным контактом и базовой адаптивной версткой.',
  'Custom request': 'Индивидуальный запрос',
  'For projects that need additional pages, visual work, integrations or extra polish.':
    'Для проектов, которым нужны дополнительные страницы, визуальная работа, интеграции или более детальная проработка.',
  'Need a website?': 'Нужен сайт?',
  'Send a short description of the project — we’ll discuss the structure, timeline and price.':
    'Отправьте короткое описание проекта — обсудим структуру, сроки и стоимость.',
  'Direct contact': 'Связаться напрямую',
  Name: 'Имя',
  'What website do you need?': 'Какой сайт вам нужен?',
  'Small web studio for websites and digital presentation.':
    'Небольшая веб-студия для сайтов и цифровой презентации.',
  Navigate: 'Навигация',
  Email: 'Почта',
  Work: 'Кейс',
  'Small web studio': 'Небольшая веб-студия',
  'Clear websites that lead clients to enquiry or booking.':
    'Аккуратные сайты, которые ведут клиента к заявке или записи.',
  'Ventor Digital creates websites, landing pages and showcase websites for small businesses, private specialists and local companies.':
    'Ventor Digital — небольшая веб-студия. Делаем аккуратные сайты, лендинги и сайты-витрины для малого бизнеса, частных специалистов и локальных компаний.',
  'View work': 'Смотреть кейс',
  'Clear structure. Careful design. Mobile-ready. An honest budget without agency theatre.':
    'Понятная структура. Аккуратный дизайн. Адаптация под телефон. Честный бюджет без агентского пафоса.',
  'Websites for local business / 2026': 'Сайты для локального бизнеса / 2026',
  'Showcase websites.': 'Сайты-витрины.',
  'Company websites.': 'Сайты компаний.',
  'Expert websites.': 'Сайты специалистов.',
  'Projects from 20,000 ₽': 'Проекты от 20 000 ₽',
  'Everything needed for a clear launch': 'Всё необходимое для понятного запуска',
  'Only practical work that helps a small business explain its services and receive enquiries.':
    'Только практичная работа, которая помогает малому бизнесу понятно показать услуги и получать обращения.',
  'Showcase websites': 'Сайты-витрины',
  'A compact one-page website with services, contacts, booking buttons and a mobile-ready layout.':
    'Компактный одностраничный сайт с услугами, контактами, кнопками связи и адаптацией под телефон.',
  'Landing pages / service pages': 'Лендинги / страницы услуг',
  'A focused page for a service, offer or promotion with considered structure, copy and an enquiry form.':
    'Сфокусированная страница для услуги, предложения или акции с продуманной структурой, текстами и формой заявки.',
  'Business websites / redesign': 'Бизнес-сайты / редизайн',
  'A broader website for services, trust, cases, team information, contacts and enquiries.':
    'Более подробный сайт с услугами, блоками доверия, кейсами, командой, контактами и заявками.',
  'Structure, copy and launch': 'Структура, тексты и запуск',
  'Page structure, copy for key blocks, contact buttons, mobile adaptation and basic launch preparation.':
    'Структура сайта, тексты для ключевых блоков, кнопки связи, адаптация под телефон и базовая подготовка к запуску.',
  'Real client case': 'Реальный клиентский кейс',
  'One real project, without invented metrics.': 'Один реальный проект — без выдуманных цифр.',
  'One completed client project with a public link and a clear description of the delivered result.':
    'Один завершённый клиентский проект с публичной ссылкой и понятным описанием результата.',
  'Official website / notary office': 'Официальный сайт / нотариальная контора',
  '01 / LIVE': '01 / ОНЛАЙН',
  'Official website for a notary office': 'Официальный сайт нотариальной конторы',
  'A live client website that brings services, required documents and contact information into one clear mobile-friendly structure.':
    'Рабочий клиентский сайт, который объединяет услуги, необходимые документы и контакты в одной понятной адаптивной структуре.',
  Task: 'Задача',
  'Create an official website where clients can quickly understand the notary services, required documents and contact details.':
    'Создать официальный сайт, где клиент быстро разберётся в нотариальных услугах, необходимых документах и контактах.',
  'What we did': 'Что сделали',
  'Built a clear responsive structure, organised the service information and made the route to contacts obvious on mobile.':
    'Собрали понятную адаптивную структуру, организовали информацию об услугах и сделали путь к контактам очевидным на телефоне.',
  'Result for the client': 'Результат для клиента',
  'A launched official website on notariat.ru that is easy to read, navigate and use from a phone.':
    'Запущенный официальный сайт на notariat.ru, который удобно читать, просматривать и использовать с телефона.',
  'Open live website': 'Открыть сайт',
  'Packages & scope': 'Тарифы и состав работ',
  'Three clear website formats.': 'Три понятных формата сайта.',
  'Projects start from': 'Стоимость проектов от',
  '20,000 ₽': '20 000 ₽',
  'Final estimate after a short discussion.': 'Итоговая оценка после короткого обсуждения.',
  'The exact price depends on content volume and complexity, but the format and included work are agreed before the project starts.':
    'Точная цена зависит от объёма и сложности контента, но формат и состав работ согласуются до начала проекта.',
  '01 / SHOWCASE': '01 / ВИТРИНА',
  'Showcase website': 'Сайт-витрина',
  '20,000–40,000 ₽': '20 000–40 000 ₽',
  'For salons, grooming, private specialists and small service businesses.':
    'Для салонов, груминга, частных специалистов и небольших услуг.',
  'One page and clear structure': 'Одна страница и понятная структура',
  'Service blocks and contacts': 'Блоки услуг и контакты',
  'Contact and booking buttons': 'Кнопки связи и записи',
  'Mobile adaptation and basic launch': 'Адаптация под телефон и базовый запуск',
  '02 / LANDING': '02 / ЛЕНДИНГ',
  'Landing / service page': 'Лендинг / страница услуги',
  '40,000–60,000 ₽': '40 000–60 000 ₽',
  'For a separate service, promotion, business direction or product.':
    'Для отдельной услуги, акции, направления или продукта.',
  'More considered page structure': 'Более продуманная структура страницы',
  'Copy for key sections': 'Тексты для ключевых блоков',
  'Individual design and enquiry form': 'Индивидуальный дизайн и форма заявки',
  'Mobile adaptation and launch preparation': 'Адаптация и базовая подготовка к запуску',
  '03 / BUSINESS': '03 / БИЗНЕС',
  'Business website / redesign': 'Бизнес-сайт / редизайн',
  '60,000–100,000 ₽': '60 000–100 000 ₽',
  'For companies that need a more detailed and trustworthy presentation.':
    'Для компаний, которым нужно подробнее и убедительнее показать бизнес.',
  'Services and company information': 'Услуги и информация о компании',
  'Trust blocks, cases and team': 'Блоки доверия, кейсы и команда',
  'Contacts and enquiry scenarios': 'Контакты и сценарии заявки',
  'Responsive design and launch preparation': 'Адаптивный дизайн и подготовка к запуску',
  'Discuss the task': 'Обсудить задачу',
  'Tell me what website you need.': 'Расскажите, какой сайт вам нужен.',
  'Describe the task — I’ll reply and suggest a clear website format.':
    'Опишите задачу — я отвечу и предложу понятный формат сайта.',
  'We can start with a short 15-minute discussion.':
    'Можно начать с короткого обсуждения на 15 минут.',
  'No commitment and no long briefing.': 'Без обязательств и длинного брифа.',
  'Contact details': 'Контакт для связи',
  'Prepare an email': 'Подготовить письмо',
  'Small web studio for websites and digital presentation.':
    'Небольшая веб-студия для сайтов, лендингов и сайтов-витрин.',
  'Back to top': 'Наверх',
});

const languageMeta = {
  en: {
    title: 'Ventor Digital — Websites for Local Businesses',
    description: 'Ventor Digital creates clear websites, landing pages and showcase websites for small businesses, private specialists and local companies.',
    socialTitle: 'Ventor Digital — Websites for Local Businesses',
    socialDescription: 'Clear websites with honest scope and pricing for small businesses and private specialists.',
    toggle: 'Switch to Russian',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    formSuccess: 'Your email draft is ready. If the mail app did not open, contact Ventor via Telegram.',
    emailSubject: 'Website request from Ventor Digital',
  },
  ru: {
    title: 'Ventor Digital — сайты для малого и локального бизнеса',
    description: 'Ventor Digital создаёт аккуратные сайты, лендинги и сайты-витрины для малого бизнеса, частных специалистов и локальных компаний.',
    socialTitle: 'Ventor Digital — сайты для малого бизнеса',
    socialDescription: 'Понятные сайты с честным составом работ и бюджетом для малого бизнеса и частных специалистов.',
    toggle: 'Переключить на английский',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    formSuccess: 'Письмо подготовлено. Если почтовое приложение не открылось, напишите Ventor в Telegram.',
    emailSubject: 'Заявка на сайт с Ventor Digital',
  },
};

const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();
const localizedTextNodes = [];
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

while (textWalker.nextNode()) {
  const node = textWalker.currentNode;
  const parent = node.parentElement;
  const key = normalizeText(node.nodeValue);

  if (
    !key ||
    !ruTranslations[key] ||
    ['SCRIPT', 'STYLE'].includes(parent?.tagName) ||
    parent?.closest('[data-float-key]') ||
    parent?.closest('[aria-hidden="true"]')
  ) {
    continue;
  }

  localizedTextNodes.push({
    node,
    key,
    leading: node.nodeValue.match(/^\s*/)?.[0] || '',
    trailing: node.nodeValue.match(/\s*$/)?.[0] || '',
  });
}

const localizedAttributes = [
  ['.brand', 'aria-label', 'Ventor Digital home', 'Главная Ventor Digital'],
  ['.site-nav', 'aria-label', 'Main navigation', 'Основная навигация'],
  ['.hero-actions', 'aria-label', 'Project actions', 'Действия проекта'],
  ['.hero-note', 'aria-label', 'Studio focus', 'Фокус студии'],
  ['.footer-nav', 'aria-label', 'Footer navigation', 'Навигация в подвале'],
  ['.example-card:first-child > a', 'aria-label', 'Visit notary office website in a new tab', 'Открыть сайт нотариальной конторы в новой вкладке'],
];

let motionInitialized = false;
let floatAnimations = [];

function renderFloatHeadings(isRussian) {
  document.querySelectorAll('[data-float-key]').forEach((heading) => {
    const key = heading.dataset.floatKey;
    const text = isRussian ? ruTranslations[key] || key : key;
    const visual = document.createElement('span');

    visual.className = 'float-text';
    visual.setAttribute('aria-hidden', 'true');

    text.split(/\s+/).forEach((word, wordIndex, words) => {
      const wordElement = document.createElement('span');
      wordElement.className = 'float-word';

      Array.from(word).forEach((character) => {
        const characterElement = document.createElement('span');
        characterElement.className = 'float-char';
        characterElement.textContent = character;
        wordElement.append(characterElement);
      });

      visual.append(wordElement);
      if (wordIndex < words.length - 1) visual.append(document.createTextNode(' '));
    });

    heading.replaceChildren(visual);
    heading.setAttribute('aria-label', text);
  });
}

function killFloatAnimations() {
  floatAnimations.forEach((animation) => {
    animation.scrollTrigger?.kill();
    animation.kill();
  });
  floatAnimations = [];
}

function setupFloatAnimations() {
  killFloatAnimations();
  if (!motionEnabled) return;

  const gsap = window.gsap;
  const isMobile = window.innerWidth <= 680;

  document.querySelectorAll('[data-float-key]').forEach((heading) => {
    const characters = heading.querySelectorAll('.float-char');
    if (!characters.length) return;

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

    floatAnimations.push(animation);
  });
}

function initializeMotion() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  motionInitialized = true;

  gsap.set('.hero-load-item', { autoAlpha: 0, y: 24 });
  gsap.set('.hero-beam', { scaleX: 0, autoAlpha: 0, transformOrigin: '0% 50%' });

  const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTimeline
    .to('.hero-beam', { scaleX: 1, autoAlpha: 0.55, duration: 1.25, ease: 'power3.inOut' })
    .to('.hero-load-item', { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.075 }, '-=0.86');

  gsap.to('.hero-beam', {
    autoAlpha: 0.68,
    boxShadow: '0 0 8px rgba(255, 31, 31, 0.58), 0 0 22px rgba(255, 31, 31, 0.24)',
    duration: 2.8,
    delay: 1.45,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  const rail = document.querySelector('.motion-rail');
  const railProgress = rail?.querySelector('span');
  const railNode = rail?.querySelector('i');

  if (rail && railProgress && railNode) {
    gsap.set(railProgress, { scaleY: 0, transformOrigin: '50% 0%' });
    gsap.to(railProgress, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.35,
      },
    });
    gsap.to(railNode, {
      y: () => Math.max(0, rail.clientHeight - railNode.offsetHeight),
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.35,
        invalidateOnRefresh: true,
      },
    });
  }

  document.querySelectorAll('.motion-card').forEach((card) => {
    const line = card.querySelector('.motion-card-line');
    const content = Array.from(card.children).filter((element) => element !== line);

    gsap.set(card, { autoAlpha: 0, y: 34 });
    gsap.set(content, { autoAlpha: 0, y: 15 });
    if (line) gsap.set(line, { scaleX: 0, transformOrigin: '0% 50%' });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 93%',
        once: true,
      },
    });

    timeline
      .to(card, { autoAlpha: 1, y: 0, duration: 0.62, ease: 'power3.out' })
      .to(line, { scaleX: 1, duration: 0.72, ease: 'power3.inOut' }, '<0.04')
      .to(content, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.06, ease: 'power2.out' }, '<0.18');
  });

  const processTimeline = document.querySelector('.process-timeline');
  const processSteps = processTimeline ? Array.from(processTimeline.querySelectorAll('.motion-step')) : [];

  if (processTimeline && processSteps.length) {
    gsap.set(processTimeline, { '--process-progress': 0 });
    gsap.set(processSteps, { autoAlpha: 0.3, y: 14 });
    gsap.set(processSteps.map((step) => step.querySelector('span')), { scale: 0.86 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: processTimeline,
        start: 'top 88%',
        end: 'bottom 52%',
        scrub: 0.65,
      },
    });

    timeline.to(processTimeline, { '--process-progress': 1, duration: 1, ease: 'none' }, 0);

    processSteps.forEach((step, index) => {
      const dot = step.querySelector('span');
      const position = index * 0.18;

      timeline
        .to(step, { autoAlpha: 1, y: 0, duration: 0.16, ease: 'power2.out' }, position)
        .to(
          dot,
          {
            scale: 1,
            backgroundColor: '#ff1f1f',
            borderColor: '#ff1f1f',
            boxShadow: '0 0 0 5px #050505, 0 0 18px rgba(255, 31, 31, 0.36)',
            duration: 0.14,
          },
          position,
        );
    });
  }

  const rangeSection = document.querySelector('.motion-range');
  const rangeSignal = rangeSection?.querySelector('.motion-price');
  const price = rangeSection?.querySelector('[data-price-reveal]');
  const rangeLead = rangeSection?.querySelector('.range-lead');
  const rangeCards = rangeSection ? Array.from(rangeSection.querySelectorAll('.motion-range-card')) : [];

  if (rangeSection && rangeSignal && price) {
    gsap.set(rangeSignal, { '--price-line': 0 });
    gsap.set(price, { autoAlpha: 0, yPercent: 26, clipPath: 'inset(0 100% 0 0)' });
    gsap.set([rangeSignal.querySelector('span'), rangeSignal.querySelector('p'), rangeLead], { autoAlpha: 0, y: 12 });
    gsap.set(rangeCards, { autoAlpha: 0, y: 28 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: rangeSection,
        start: 'top 84%',
        once: true,
      },
    });

    timeline
      .to(rangeSignal, { '--price-line': 1, duration: 0.48, ease: 'power2.inOut' })
      .to([rangeSignal.querySelector('span'), rangeSignal.querySelector('p')], { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 }, '<0.08')
      .to(price, { autoAlpha: 1, yPercent: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.78, ease: 'power3.out' }, '<0.03')
      .to(rangeLead, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '<0.18')
      .to(rangeCards, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.08, ease: 'power3.out' }, '<0.14');
  }

  const contactSection = document.querySelector('.motion-contact');
  const contactBeam = contactSection?.querySelector('.contact-beam');
  const contactFormElement = contactSection?.querySelector('.contact-form');
  const contactCopyParts = contactSection?.querySelectorAll('.contact-copy > .eyebrow, .contact-copy > p, .contact-promise, .contact-direct');
  const formParts = contactFormElement?.querySelectorAll('.form-row, .form-submit');

  if (contactSection && contactBeam && contactFormElement) {
    gsap.set(contactBeam, { scaleX: 0, autoAlpha: 0, transformOrigin: '0% 50%' });
    gsap.set(contactFormElement, { autoAlpha: 0, y: 34, '--form-line': 0 });
    gsap.set(contactCopyParts, { autoAlpha: 0, y: 16 });
    gsap.set(formParts, { autoAlpha: 0, y: 12 });

    gsap.to(contactBeam, {
      scaleX: 1,
      autoAlpha: 0.48,
      ease: 'none',
      scrollTrigger: {
        trigger: contactSection,
        start: 'top 88%',
        end: 'top 50%',
        scrub: 0.7,
      },
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: contactSection,
        start: 'top 72%',
        once: true,
      },
    });

    timeline
      .to(contactCopyParts, { autoAlpha: 1, y: 0, duration: 0.52, stagger: 0.08, ease: 'power2.out' })
      .to(contactFormElement, { autoAlpha: 1, y: 0, duration: 0.66, ease: 'power3.out' }, '<0.12')
      .to(contactFormElement, { '--form-line': 1, duration: 0.62, ease: 'power3.inOut' }, '<0.06')
      .to(formParts, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.07, ease: 'power2.out' }, '<0.18');
  }

  setupFloatAnimations();
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

function getSavedLanguage() {
  const queryLanguage = new URLSearchParams(window.location.search).get('lang');

  if (queryLanguage === 'en' || queryLanguage === 'ru') return queryLanguage;

  try {
    const savedLanguage = window.localStorage.getItem('ventor-language-v2');
    return savedLanguage === 'en' ? 'en' : 'ru';
  } catch {
    return 'ru';
  }
}

let currentLanguage = getSavedLanguage();

function setMetaContent(selector, content) {
  document.querySelector(selector)?.setAttribute('content', content);
}

function applyLanguage(language, persist = true) {
  currentLanguage = language === 'ru' ? 'ru' : 'en';
  const isRussian = currentLanguage === 'ru';
  const meta = languageMeta[currentLanguage];

  document.documentElement.lang = currentLanguage;
  body.classList.toggle('lang-ru', isRussian);
  document.title = meta.title;
  setMetaContent('meta[name="description"]', meta.description);
  setMetaContent('meta[property="og:title"]', meta.socialTitle);
  setMetaContent('meta[property="og:description"]', meta.socialDescription);
  setMetaContent('meta[name="twitter:title"]', meta.socialTitle);
  setMetaContent('meta[name="twitter:description"]', meta.socialDescription);

  localizedTextNodes.forEach(({ node, key, leading, trailing }) => {
    node.nodeValue = `${leading}${isRussian ? ruTranslations[key] : key}${trailing}`;
  });

  renderFloatHeadings(isRussian);

  localizedAttributes.forEach(([selector, attribute, english, russian]) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.setAttribute(attribute, isRussian ? russian : english);
    });
  });

  document.querySelectorAll('[data-placeholder-ru]').forEach((field) => {
    if (!field.dataset.placeholderEn) field.dataset.placeholderEn = field.getAttribute('placeholder') || '';
    field.setAttribute('placeholder', isRussian ? field.dataset.placeholderRu : field.dataset.placeholderEn);
  });

  languageToggle?.querySelectorAll('[data-language-option]').forEach((option) => {
    option.classList.toggle('is-active', option.dataset.languageOption === currentLanguage);
  });
  languageToggle?.setAttribute('aria-label', meta.toggle);

  const menuIsOpen = siteNav?.classList.contains('is-open') || false;
  menuToggle?.setAttribute('aria-label', menuIsOpen ? meta.closeMenu : meta.openMenu);

  if (formStatus?.classList.contains('is-visible')) formStatus.textContent = meta.formSuccess;

  if (persist) {
    try {
      window.localStorage.setItem('ventor-language-v2', currentLanguage);
    } catch {
      // Language switching still works when storage is unavailable.
    }
  }

  if (motionInitialized) {
    setupFloatAnimations();
    requestAnimationFrame(() => window.ScrollTrigger.refresh());
  }
}

function closeMenu() {
  siteNav?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', languageMeta[currentLanguage].openMenu);
  body.classList.remove('menu-open');
}

menuToggle?.addEventListener('click', () => {
  const willOpen = !siteNav?.classList.contains('is-open');
  siteNav?.classList.toggle('is-open', willOpen);
  menuToggle.setAttribute('aria-expanded', String(willOpen));
  menuToggle.setAttribute('aria-label', willOpen ? languageMeta[currentLanguage].closeMenu : languageMeta[currentLanguage].openMenu);
  body.classList.toggle('menu-open', willOpen);
});

siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMenu();
});

languageToggle?.addEventListener('click', () => {
  applyLanguage(currentLanguage === 'en' ? 'ru' : 'en');
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim();
  const contact = String(formData.get('contact') || '').trim();
  const request = String(formData.get('request') || '').trim();
  const message = currentLanguage === 'ru'
    ? `Имя: ${name}\nКонтакт: ${contact}\n\nЗадача:\n${request}`
    : `Name: ${name}\nContact: ${contact}\n\nProject brief:\n${request}`;
  const mailto = new URL('mailto:ventordigital@gmail.com');

  mailto.searchParams.set('subject', languageMeta[currentLanguage].emailSubject);
  mailto.searchParams.set('body', message);
  window.location.href = mailto.toString();

  formStatus.textContent = languageMeta[currentLanguage].formSuccess;
  formStatus.classList.add('is-visible');
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -7% 0px' },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
applyLanguage(currentLanguage, false);

if (motionEnabled) {
  try {
    initializeMotion();
    window.addEventListener('load', () => window.ScrollTrigger.refresh(), { once: true });
  } catch {
    body.classList.remove('gsap-ready');
    body.classList.add('is-ready');
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
    window.gsap.set(
      '.hero-load-item, .hero-beam, .motion-card, .motion-card *, .motion-step, .motion-step span, .motion-range-card, .motion-price, .motion-price *, .range-lead, .motion-contact *, .float-char',
      { clearProps: 'all' },
    );
  }
} else {
  requestAnimationFrame(() => body.classList.add('is-ready'));
}
