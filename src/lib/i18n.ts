export type Lang = 'pl' | 'en';

export const translations = {
  pl: {
    nav: {
      knowledge: 'Baza wiedzy',
      projects: 'Projekty',
      contact: 'Kontakt',
      blog: 'Blog',
    },
    header: {
      subtitle: 'Marketing, Konsultacje & SaaS',
    },
    hero: {
      badge: 'Marketing · SaaS · Web development',
      subtitle: "Marketing · Start-up's · SaaS · Web development",
      description:
        'Tworzę projekty oparte na realnych problemach użytkowników, które przynoszą realne efekty. Sklepy internetowe, aplikacje SaaS, a także backstage z budowania biznesu.',
      ctaButton: 'Umów bezpłatną konsultację',
      socialLabel: 'Social:',
      scrollCue: 'Przewiń na dół',
      errorEmail: 'Wprowadź prawidłowy adres e-mail.',
      errorServer: 'Błąd połączenia z serwerem. Spróbuj ponownie później.',
    },
    services: {
      tag: 'USŁUGI',
      title: 'Czym mogę Ci pomóc?',
      subtitle: 'Kompleksowe wsparcie marketingowe i technologiczne dla małych firm i specjalistów — bez pośredników i agencji.',
      items: [
        {
          title: 'Content Marketing',
          desc: 'Tworzę strategię treści dopasowaną do Twojej branży i grupy docelowej. Planuję kalendarz publikacji, piszę angażujące artykuły blogowe i posty w social mediach, które budują autorytet marki i przyciągają ruch organiczny. Dla klientów e-commerce i B2B średnio generuję wzrost ruchu organicznego o 80–140% w ciągu 6 miesięcy.',
        },
        {
          title: 'Konsultacje Marketingowe B2B',
          desc: 'Audytuję obecne działania marketingowe i buduję lejek sprzedażowy od zera. Pomagam zdefiniować ICP (idealny profil klienta), dobrać kanały pozyskiwania leadów i zmierzyć efekty. Pracuję z firmami usługowymi, SaaS i e-commerce — od strategii po codzienną egzekucję kampanii.',
        },
        {
          title: 'Techniczne SEO',
          desc: 'Przeprowadzam audyty techniczne SEO obejmujące Core Web Vitals, architekturę linkowania wewnętrznego, crawl budget i indeksację. Optymalizuję meta tagi, dane strukturalne (JSON-LD), szybkość ładowania i responsywność. Efekt: strony klientów osiągają wyniki 95+ w Google Lighthouse.',
        },
        {
          title: 'Aplikacje SaaS',
          desc: 'Projektuję i buduję aplikacje SaaS od pomysłu po wdrożenie — stack: React, Node.js, TypeScript, bazy danych SQL/NoSQL. Integruję płatności (Stripe), systemy mailowe (Resend, MailerLite), API AI (GPT-4) i autoryzację. Specjalizuję się w MVP, które można szybko zwalidować na rynku.',
        },
        {
          title: 'Strony Internetowe',
          desc: 'Buduję szybkie, responsywne strony internetowe bez gotowych szablonów — każdy projekt od zera pod Twoją markę. Stosuję nowoczesne technologie (React, Next.js, Tailwind CSS), dbam o SEO on-page i optymalizację wydajności. Wdrażam na Vercel z SSL, CDN i automatycznym skalowaniem.',
        },
      ],
    },
    faq: {
      tag: 'FAQ',
      title: 'Najczęściej zadawane pytania',
      subtitle: 'Odpowiedzi na pytania, które najczęściej słyszę od potencjalnych klientów.',
      items: [
        {
          q: 'Dla jakich firm pracujesz?',
          a: 'Pracuję głównie z małymi firmami, freelancerami i specjalistami, którzy chcą zbudować profesjonalną obecność online i system pozyskiwania klientów — bez pośredników i agencji. Obsługuję branże B2B, e-commerce, SaaS, usługi lokalne i firmy technologiczne.',
        },
        {
          q: 'Jak wygląda współpraca krok po kroku?',
          a: 'Zaczynamy od bezpłatnej konsultacji (30 min), na której poznaję Twoje cele i wyzwania. Następnie przygotowuję propozycję zakresu prac i wycenę. Po akceptacji realizuję projekt etapami z regularnymi aktualizacjami. Na koniec wdrażam rozwiązanie i zapewniam wsparcie powdrożeniowe.',
        },
        {
          q: 'Ile kosztują Twoje usługi?',
          a: 'Ceny zależą od zakresu projektu. Strony internetowe zaczynam od 3 000 PLN, konsultacje marketingowe od 200 PLN/h, a projekty SaaS wyceniam indywidualnie. Bezpłatna konsultacja pomoże określić budżet dopasowany do Twoich potrzeb.',
        },
        {
          q: 'Ile trwa typowy projekt?',
          a: 'Strona internetowa: 2–4 tygodnie. Strategia marketingowa: 1–2 tygodnie na audyt i plan + bieżąca realizacja. MVP aplikacji SaaS: 4–8 tygodni. Dokładny harmonogram ustalimy na konsultacji.',
        },
        {
          q: 'Czy pomagasz firmom bez budżetu na reklamę?',
          a: 'Tak — specjalizuję się w strategiach organicznych: content marketing, SEO, social media i budowa lejka sprzedażowego opartego na treściach. Wiele moich klientów generuje leady bez wydawania na płatne reklamy.',
        },
        {
          q: 'Co odróżnia Cię od agencji marketingowych?',
          a: 'Pracujesz bezpośrednio ze mną — bez account managerów, bez juniorów, bez ukrytych kosztów. Łączę kompetencje marketingowe z technicznymi (koduję, wdrażam, optymalizuję). Szybsza komunikacja, niższe koszty i pełna transparentność.',
        },
        {
          q: 'Jak mierzysz efekty działań marketingowych?',
          a: 'Śledzę konkretne KPI: ruch organiczny, pozycje w Google, współczynnik konwersji, liczbę leadów, koszt pozyskania klienta (CAC) i wartość życiową klienta (LTV). Raportuję miesięcznie z rekomendacjami na kolejny okres.',
        },
        {
          q: 'Czy pracujesz zdalnie?',
          a: 'Tak, 100% moich projektów realizuję zdalnie. Komunikuję się przez e-mail, Slack, Google Meet lub inne narzędzia, które preferujesz. Jestem dostępny w godzinach 9:00–17:00 CET.',
        },
      ],
    },
    newsletter: {
      title: 'Backstage biznesu i SaaS',
      desc: 'Zapisz się — zero spamu, tylko konkrety z marketingu, SaaS i budowania biznesu.',
      placeholder: 'Twój adres e-mail...',
      button: 'Dołącz',
      joining: 'Zapis...',
    },
    projects: {
      sectionTag: 'PORTFOLIO PROJEKTÓW',
      sectionTitle: 'Zrealizowane Aplikacje, Witryny & SaaS',
      sectionDesc:
        'Wybierz kategorię, aby odfiltrować projekty marketingowe, e-commerce oraz zaawansowane realizacje deweloperskie i SaaS.',
      filterAll: 'Wszystkie',
      filterDev: 'Aplikacje & SaaS',
      filterEcommerce: 'Sklepy E-commerce',
      filterServices: 'Strony Usługowe',
      filterPortfolio: 'Portfolio i LP',
      empty: 'Brak projektów w wybranej kategorii. Wybierz inną kategorię lub zresetuj filtr.',
    },
    about: {
      tag: 'BAZA WIEDZY & CASE STUDIES',
      title: 'Artykuły, Analizy i Poradniki',
      subtitle: 'Praktyczne spojrzenie na nowoczesny marketing, tworzenie aplikacji SaaS oraz pozycjonowanie.',
      filterAll: 'Wszystkie wpisy',
      filterMarketing: 'Marketing & SEO',
      filterSaas: 'SaaS & Produktywność',
      filterTech: 'Development & SaaS',
      searchPlaceholder: 'Szukaj artykułów...',
      loading: 'Ładowanie artykułów...',
      emptyTitle: 'Wkrótce pierwsze artykuły',
      emptyDesc:
        "Sekcja jest w przygotowaniu. Pierwsze wpisy z zakresu marketingu, SaaS i development'u pojawią się wkrótce.",
      resetFilters: 'Wyzeruj filtry',
      readArticle: 'Czytaj artykuł',
      backToList: 'Wróć do listy wszystkich artykułów',
      authorTitle: 'O autorze — Igor Chmiel',
      authorDesc:
        'Marketing Manager, programista i niezależny konsultant biznesowy. Łączę techniczne SEO, automatyzację i budowę lejków sprzedażowych dla e-commerce i B2B.',
    },
    contact: {
      tag: 'POROZMAWIAJMY O TWOIM PROJEKCIE',
      title: 'Rozpocznijmy współpracę',
      titleSub: 'już dziś',
      subtitle:
        'Napisz do mnie — odpowiadam zazwyczaj w ciągu 24 godzin. Niezależnie czy potrzebujesz strategii marketingowej, konsultacji B2B, aplikacji SaaS czy strony internetowej.',
      directTitle: 'Metody bezpośrednie',
      emailLabel: 'Adres E-mail',
      portfolioLabel: 'Portfolio online',
      calendlyLabel: 'Umów konsultację',
      qualityTitle: 'Gwarancja jakości współpracy',
      formTitle: 'Napisz wiadomość',
      nameLabel: 'Imię i nazwisko',
      namePlaceholder: 'np. Jan Kowalski',
      emailPlaceholder: 'np. jan@przyklad.pl',
      messageLabel: 'Treść wiadomości',
      messagePlaceholder:
        'Opisz krótko swój projekt — marketing, konsultacje B2B, SaaS, strona internetowa — oraz preferowany czas realizacji...',
      sendButton: 'Wyślij zapytanie',
      sending: 'Szyfrowanie i wysyłka...',
      successTitle: 'Wiadomość została wysłana pomyślnie!',
      successDesc:
        'Dziękuję za kontakt! Wiadomość została przesłana na adres kontakt@igorchmiel.pl. Otrzymasz odpowiedź tak szybko, jak to możliwe.',
      errorTitle: 'Błąd podczas wysyłania wiadomości',
      qualities: [
        {
          title: 'Indywidualne podejście',
          desc: 'Każda witryna projektowana jest od zera, bez gotowych szablonów. Dopasowuję kod i design w 100% pod Twoją markę i cele biznesowe.',
        },
        {
          title: 'Prędkość i SEO',
          desc: 'Stosuję wyłącznie czysty, semantyczny kod, co przekłada się na wyniki 95+ w Google Lighthouse oraz znakomitą bazę pod pozycjonowanie.',
        },
        {
          title: 'Bezpieczeństwo i wsparcie',
          desc: 'Zapewniam pełną pomoc techniczną przy wdrożeniu i hostingach, a także gwarancję stabilności oraz darmową opiekę powdrożeniową.',
        },
      ],
    },
    footer: {
      rights: '© 2026. Wszystkie prawa zastrzeżone.',
      subtitle: 'Igor Chmiel — Marketing, Konsultacje, SaaS & Code',
      privacy: 'Polityka prywatności',
      nip: 'NIP: 7831897775',
    },
  },

  en: {
    nav: {
      knowledge: 'Knowledge Base',
      projects: 'Projects',
      contact: 'Contact',
      blog: 'Blog',
    },
    header: {
      subtitle: 'Marketing, Consulting & SaaS',
    },
    hero: {
      badge: 'Marketing · SaaS · Web Development',
      subtitle: 'Marketing · Start-ups · SaaS · Web Development',
      description:
        'I build projects grounded in real user problems that deliver measurable results — e-commerce stores, SaaS apps, and behind-the-scenes of building a business.',
      ctaButton: 'Book a free consultation',
      socialLabel: 'Social:',
      scrollCue: 'Scroll down',
      errorEmail: 'Please enter a valid email address.',
      errorServer: 'Connection error. Please try again later.',
    },
    services: {
      tag: 'SERVICES',
      title: 'How can I help you?',
      subtitle: 'Comprehensive marketing and technology support for small businesses and specialists — no middlemen, no agencies.',
      items: [
        {
          title: 'Content Marketing',
          desc: 'I create a content strategy tailored to your industry and target audience. I plan publication calendars, write engaging blog articles and social media posts that build brand authority and drive organic traffic. For e-commerce and B2B clients, I typically generate 80–140% organic traffic growth within 6 months.',
        },
        {
          title: 'B2B Marketing Consulting',
          desc: 'I audit your current marketing efforts and build a sales funnel from scratch. I help define your ICP (ideal customer profile), select lead acquisition channels, and measure results. I work with service businesses, SaaS, and e-commerce — from strategy to daily campaign execution.',
        },
        {
          title: 'Technical SEO',
          desc: 'I conduct technical SEO audits covering Core Web Vitals, internal linking architecture, crawl budget, and indexation. I optimize meta tags, structured data (JSON-LD), load speed, and responsiveness. Result: client websites achieve 95+ scores on Google Lighthouse.',
        },
        {
          title: 'SaaS Applications',
          desc: 'I design and build SaaS applications from idea to deployment — stack: React, Node.js, TypeScript, SQL/NoSQL databases. I integrate payments (Stripe), email systems (Resend, MailerLite), AI APIs (GPT-4), and authentication. I specialize in MVPs that can be quickly validated on the market.',
        },
        {
          title: 'Websites',
          desc: 'I build fast, responsive websites without templates — every project from scratch for your brand. I use modern technologies (React, Next.js, Tailwind CSS), take care of on-page SEO, and optimize performance. I deploy on Vercel with SSL, CDN, and automatic scaling.',
        },
      ],
    },
    faq: {
      tag: 'FAQ',
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to the questions I hear most often from potential clients.',
      items: [
        {
          q: 'What types of businesses do you work with?',
          a: 'I primarily work with small businesses, freelancers, and specialists who want to build a professional online presence and client acquisition system — without middlemen or agencies. I serve B2B, e-commerce, SaaS, local services, and tech companies.',
        },
        {
          q: 'What does the collaboration process look like?',
          a: 'We start with a free consultation (30 min) where I learn about your goals and challenges. Then I prepare a scope proposal and quote. After approval, I execute the project in stages with regular updates. Finally, I deploy the solution and provide post-launch support.',
        },
        {
          q: 'How much do your services cost?',
          a: 'Prices depend on the project scope. Websites start from 3,000 PLN, marketing consultations from 200 PLN/h, and SaaS projects are priced individually. A free consultation will help determine a budget that fits your needs.',
        },
        {
          q: 'How long does a typical project take?',
          a: 'Website: 2–4 weeks. Marketing strategy: 1–2 weeks for audit and plan + ongoing execution. SaaS MVP: 4–8 weeks. We\'ll determine the exact timeline during the consultation.',
        },
        {
          q: 'Do you help businesses with no ad budget?',
          a: 'Yes — I specialize in organic strategies: content marketing, SEO, social media, and building content-based sales funnels. Many of my clients generate leads without spending on paid advertising.',
        },
        {
          q: 'What sets you apart from marketing agencies?',
          a: 'You work directly with me — no account managers, no juniors, no hidden costs. I combine marketing and technical skills (I code, deploy, and optimize). Faster communication, lower costs, and full transparency.',
        },
        {
          q: 'How do you measure marketing results?',
          a: 'I track specific KPIs: organic traffic, Google positions, conversion rate, number of leads, customer acquisition cost (CAC), and customer lifetime value (LTV). I report monthly with recommendations for the next period.',
        },
        {
          q: 'Do you work remotely?',
          a: 'Yes, 100% of my projects are done remotely. I communicate via email, Slack, Google Meet, or any tools you prefer. I\'m available 9:00 AM–5:00 PM CET.',
        },
      ],
    },
    newsletter: {
      title: 'Business & SaaS backstage',
      desc: 'Subscribe — zero spam, only actionable insights on marketing, SaaS, and building a business.',
      placeholder: 'Your email address...',
      button: 'Join',
      joining: 'Joining...',
    },
    projects: {
      sectionTag: 'PROJECT PORTFOLIO',
      sectionTitle: 'Apps, Websites & SaaS Projects',
      sectionDesc:
        'Filter by category to explore marketing, e-commerce and advanced development & SaaS projects.',
      filterAll: 'All',
      filterDev: 'Apps & SaaS',
      filterEcommerce: 'E-commerce',
      filterServices: 'Service Sites',
      filterPortfolio: 'Portfolio & LP',
      empty: 'No projects in this category. Choose another category or reset the filter.',
    },
    about: {
      tag: 'KNOWLEDGE BASE & CASE STUDIES',
      title: 'Articles, Analyses & Guides',
      subtitle: 'A practical look at modern marketing, SaaS development and SEO.',
      filterAll: 'All posts',
      filterMarketing: 'Marketing & SEO',
      filterSaas: 'SaaS & Productivity',
      filterTech: 'Development & SaaS',
      searchPlaceholder: 'Search articles...',
      loading: 'Loading articles...',
      emptyTitle: 'First articles coming soon',
      emptyDesc:
        'This section is under preparation. First posts covering marketing, SaaS and development will appear soon.',
      resetFilters: 'Reset filters',
      readArticle: 'Read article',
      backToList: 'Back to all articles',
      authorTitle: 'About the author — Igor Chmiel',
      authorDesc:
        'Marketing Manager, developer and independent business consultant. I combine technical SEO, automation and sales funnel building for e-commerce and B2B.',
    },
    contact: {
      tag: "LET'S TALK ABOUT YOUR PROJECT",
      title: "Let's Start Working Together",
      titleSub: 'today',
      subtitle:
        "Write to me — I usually reply within 24 hours. Whether you need a marketing strategy, B2B consulting, a SaaS app, or a website.",
      directTitle: 'Direct contact',
      emailLabel: 'Email Address',
      portfolioLabel: 'Online Portfolio',
      calendlyLabel: 'Book a consultation',
      qualityTitle: 'Quality guarantee',
      formTitle: 'Send a message',
      nameLabel: 'Full name',
      namePlaceholder: 'e.g. John Smith',
      emailPlaceholder: 'e.g. john@example.com',
      messageLabel: 'Message',
      messagePlaceholder:
        'Briefly describe your project — marketing, B2B consulting, SaaS, website — and your preferred timeline...',
      sendButton: 'Send inquiry',
      sending: 'Encrypting & sending...',
      successTitle: 'Message sent successfully!',
      successDesc:
        "Thank you for reaching out! Your message has been sent to kontakt@igorchmiel.pl. You'll receive a reply as soon as possible.",
      errorTitle: 'Error sending message',
      qualities: [
        {
          title: 'Tailored approach',
          desc: 'Every website is designed from scratch — no templates. I tailor code and design 100% to your brand and business goals.',
        },
        {
          title: 'Speed & SEO',
          desc: 'I write only clean, semantic code, achieving 95+ scores in Google Lighthouse and an excellent SEO foundation.',
        },
        {
          title: 'Security & support',
          desc: 'Full technical assistance with deployment and hosting, stability guarantee and free post-launch care included.',
        },
      ],
    },
    footer: {
      rights: '© 2026. All rights reserved.',
      subtitle: 'Igor Chmiel — Marketing, Consulting, SaaS & Code',
      privacy: 'Privacy Policy',
      nip: 'Tax ID: 7831897775',
    },
  },
} as const;

export function useTranslations(lang: Lang) {
  return translations[lang];
}
