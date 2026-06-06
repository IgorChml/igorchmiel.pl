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
      newsletterLabel: 'Zapisz się — backstage biznesu i SaaS (Zero spamu!):',
      emailPlaceholder: 'Twój adres e-mail...',
      joinButton: 'Dołącz',
      joining: 'Zapis...',
      socialLabel: 'Social:',
      scrollCue: 'Przewiń na dół',
      errorEmail: 'Wprowadź prawidłowy adres e-mail.',
      errorServer: 'Błąd połączenia z serwerem. Spróbuj ponownie później.',
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
      tag: 'POTRZEBUJESZ STRONY? NAPISZ DO MNIE',
      title: 'Rozpocznijmy Twój projekt',
      titleSub: 'już dziś',
      subtitle:
        'Napisz do mnie – odpowiadam zazwyczaj w ciągu 24 godzin. Porozmawiajmy o darmowej wycenie i stwórzmy stronę, która deklasuje konkurencję.',
      directTitle: 'Metody bezpośrednie',
      emailLabel: 'Adres E-mail',
      portfolioLabel: 'Portfolio online',
      qualityTitle: 'Gwarancja jakości współpracy',
      formTitle: 'Napisz wiadomość',
      nameLabel: 'Imię i nazwisko',
      namePlaceholder: 'np. Jan Kowalski',
      emailPlaceholder: 'np. jan@przyklad.pl',
      messageLabel: 'Treść wiadomości',
      messagePlaceholder:
        'Opisz krótko swój projekt deweloperski, preferowany czas realizacji oraz zakładane funkcjonalności...',
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
      newsletterLabel: 'Subscribe — business & SaaS backstage (Zero spam!):',
      emailPlaceholder: 'Your email address...',
      joinButton: 'Join',
      joining: 'Joining...',
      socialLabel: 'Social:',
      scrollCue: 'Scroll down',
      errorEmail: 'Please enter a valid email address.',
      errorServer: 'Connection error. Please try again later.',
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
      tag: 'NEED A WEBSITE? WRITE TO ME',
      title: "Let's Start Your Project",
      titleSub: 'today',
      subtitle:
        "Write to me — I usually reply within 24 hours. Let's discuss a free quote and build a site that outclasses the competition.",
      directTitle: 'Direct contact',
      emailLabel: 'Email Address',
      portfolioLabel: 'Online Portfolio',
      qualityTitle: 'Quality guarantee',
      formTitle: 'Send a message',
      nameLabel: 'Full name',
      namePlaceholder: 'e.g. John Smith',
      emailPlaceholder: 'e.g. john@example.com',
      messageLabel: 'Message',
      messagePlaceholder:
        'Briefly describe your project, preferred timeline and expected features...',
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
    },
  },
} as const;

export function useTranslations(lang: Lang) {
  return translations[lang];
}
