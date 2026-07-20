import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka Prywatności',
  description:
    'Polityka prywatności serwisu igorchmiel.pl — informacje o przetwarzaniu danych osobowych zgodnie z RODO. Administrator: Igor Chmiel, NIP 7831897775.',
  alternates: {
    canonical: 'https://igorchmiel.pl/polityka-prywatnosci',
  },
  openGraph: {
    title: 'Polityka Prywatności | Igor Chmiel',
    description:
      'Polityka prywatności serwisu igorchmiel.pl — informacje o przetwarzaniu danych osobowych zgodnie z RODO.',
    url: 'https://igorchmiel.pl/polityka-prywatnosci',
    type: 'website',
    locale: 'pl_PL',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-neutral-950 text-white">
      <section className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight leading-tight">
              Polityka Prywatności
            </h1>
            <p className="text-xs text-neutral-500">
              Ostatnia aktualizacja: czerwiec 2026
            </p>
          </div>

          <div className="space-y-10 text-sm text-neutral-400 font-sans leading-relaxed">
            {/* 1. Administrator */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">
                1. Administrator danych osobowych
              </h2>
              <p>
                Administratorem danych osobowych zbieranych za pośrednictwem serwisu
                igorchmiel.pl jest:
              </p>
              <div className="bg-neutral-900 border border-white/8 rounded p-5 space-y-1 text-xs">
                <p className="text-white font-bold">Igor Chmiel</p>
                <p>NIP: 7831897775</p>
                <p>
                  E-mail:{' '}
                  <a
                    href="mailto:kontakt@igorchmiel.pl"
                    className="text-brand hover:underline"
                  >
                    kontakt@igorchmiel.pl
                  </a>
                </p>
              </div>
              <p>
                Administrator dokłada szczególnej staranności w celu ochrony interesów osób,
                których dane dotyczą, a w szczególności zapewnia, że zbierane przez niego
                dane są przetwarzane zgodnie z prawem, zbierane dla oznaczonych, zgodnych z
                prawem celów i niepoddawane dalszemu przetwarzaniu niezgodnemu z tymi celami.
              </p>
            </div>

            {/* 2. Formularz kontaktowy */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">
                2. Formularz kontaktowy
              </h2>
              <p>
                Korzystając z formularza kontaktowego na stronie igorchmiel.pl, przekazujesz
                następujące dane osobowe:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Imię i nazwisko</li>
                <li>Adres e-mail</li>
                <li>Treść wiadomości</li>
              </ul>
              <p>
                <strong className="text-white">Cel przetwarzania:</strong> odpowiedź na
                Twoje zapytanie i ewentualne nawiązanie współpracy.
              </p>
              <p>
                <strong className="text-white">Podstawa prawna:</strong> art. 6 ust. 1 lit.
                b) RODO (podjęcie działań na żądanie osoby, której dane dotyczą, przed
                zawarciem umowy) oraz art. 6 ust. 1 lit. f) RODO (prawnie uzasadniony interes
                administratora — odpowiedź na zapytanie).
              </p>
              <p>
                <strong className="text-white">Okres przechowywania:</strong> dane są
                przechowywane przez okres niezbędny do obsługi zapytania, nie dłużej niż 12
                miesięcy od ostatniego kontaktu, chyba że nawiązana zostanie współpraca
                wymagająca dłuższego okresu przetwarzania.
              </p>
            </div>

            {/* 3. Newsletter */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">
                3. Newsletter (MailerLite)
              </h2>
              <p>
                Zapisując się na newsletter, przekazujesz swój adres e-mail. Dane te są
                przetwarzane przez MailerLite (MailerLite Limited, Ground Floor, 111 Upper
                Richmond Road, London, SW15 2TJ, United Kingdom) jako podmiot przetwarzający
                na zlecenie administratora.
              </p>
              <p>
                <strong className="text-white">Cel przetwarzania:</strong> wysyłka
                newslettera z treściami dotyczącymi marketingu, rozwoju biznesu, SaaS i web
                developmentu.
              </p>
              <p>
                <strong className="text-white">Podstawa prawna:</strong> art. 6 ust. 1 lit.
                a) RODO (zgoda wyrażona poprzez zapisanie się na newsletter).
              </p>
              <p>
                <strong className="text-white">Okres przechowywania:</strong> dane są
                przetwarzane do czasu wycofania zgody (wypisania się z newslettera). Możesz
                wypisać się w dowolnym momencie, klikając link rezygnacji w każdej wiadomości.
              </p>
              <p>
                MailerLite stosuje odpowiednie środki techniczne i organizacyjne w celu
                ochrony danych osobowych. Polityka prywatności MailerLite:{' '}
                <a
                  href="https://www.mailerlite.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  mailerlite.com/legal/privacy-policy
                </a>
              </p>
            </div>

            {/* 4. Pliki cookies i analityka */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">
                4. Pliki cookies i analityka
              </h2>
              <p>
                Serwis igorchmiel.pl wykorzystuje pliki cookies (ciasteczka) w następujących
                celach:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>
                  <strong className="text-white">Cookies niezbędne</strong> — zapewniają
                  prawidłowe działanie strony (np. zapamiętanie preferowanego języka).
                </li>
                <li>
                  <strong className="text-white">Cookies analityczne</strong> — zbierają
                  anonimowe informacje o sposobie korzystania ze strony (np. odwiedzane
                  podstrony, czas spędzony na stronie) w celu poprawy jakości serwisu.
                </li>
              </ul>
              <p>
                Do analizy ruchu na stronie mogą być wykorzystywane narzędzia takie jak Google
                Analytics 4 lub Vercel Analytics. Dane zbierane przez te narzędzia są
                anonimizowane i nie pozwalają na bezpośrednią identyfikację użytkownika.
              </p>
              <p>
                Możesz zarządzać ustawieniami cookies w swojej przeglądarce, w tym zablokować
                lub usunąć pliki cookies. Wyłączenie cookies może wpłynąć na funkcjonalność
                strony.
              </p>
            </div>

            {/* 5. Prawa użytkownika */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">
                5. Twoje prawa (RODO)
              </h2>
              <p>
                Na podstawie Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679
                (RODO) przysługują Ci następujące prawa:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>
                  <strong className="text-white">Prawo dostępu</strong> — możesz uzyskać
                  informację o przetwarzanych danych osobowych (art. 15 RODO).
                </li>
                <li>
                  <strong className="text-white">Prawo do sprostowania</strong> — możesz
                  żądać poprawienia nieprawidłowych danych (art. 16 RODO).
                </li>
                <li>
                  <strong className="text-white">Prawo do usunięcia</strong> — możesz żądać
                  usunięcia danych w określonych przypadkach (art. 17 RODO).
                </li>
                <li>
                  <strong className="text-white">Prawo do ograniczenia przetwarzania</strong>{' '}
                  — możesz żądać ograniczenia przetwarzania danych (art. 18 RODO).
                </li>
                <li>
                  <strong className="text-white">Prawo do przenoszenia danych</strong> —
                  możesz otrzymać swoje dane w formacie nadającym się do odczytu maszynowego
                  (art. 20 RODO).
                </li>
                <li>
                  <strong className="text-white">Prawo do sprzeciwu</strong> — możesz
                  wnieść sprzeciw wobec przetwarzania danych opartego na prawnie uzasadnionym
                  interesie (art. 21 RODO).
                </li>
                <li>
                  <strong className="text-white">Prawo do cofnięcia zgody</strong> — jeśli
                  przetwarzanie opiera się na zgodzie, możesz ją cofnąć w dowolnym momencie
                  bez wpływu na zgodność z prawem przetwarzania sprzed cofnięcia (art. 7 ust.
                  3 RODO).
                </li>
              </ul>
              <p>
                W celu skorzystania z powyższych praw skontaktuj się z administratorem pod
                adresem{' '}
                <a
                  href="mailto:kontakt@igorchmiel.pl"
                  className="text-brand hover:underline"
                >
                  kontakt@igorchmiel.pl
                </a>
                .
              </p>
              <p>
                Masz również prawo wniesienia skargi do organu nadzorczego — Prezesa Urzędu
                Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa,{' '}
                <a
                  href="https://uodo.gov.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  uodo.gov.pl
                </a>
                ).
              </p>
            </div>

            {/* 6. Odbiorcy danych */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">
                6. Odbiorcy danych
              </h2>
              <p>Twoje dane osobowe mogą być przekazywane następującym podmiotom:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>
                  <strong className="text-white">MailerLite</strong> — obsługa newslettera
                </li>
                <li>
                  <strong className="text-white">Vercel Inc.</strong> — hosting strony
                  internetowej
                </li>
                <li>
                  <strong className="text-white">Google LLC</strong> — analityka (Google
                  Analytics)
                </li>
                <li>
                  <strong className="text-white">Resend</strong> — wysyłka e-maili
                  transakcyjnych z formularza kontaktowego
                </li>
              </ul>
              <p>
                Powyżsi podmioty przetwarzają dane na podstawie zawartych umów powierzenia
                przetwarzania danych lub w ramach standardowych klauzul umownych
                zapewniających odpowiedni poziom ochrony danych.
              </p>
            </div>

            {/* 7. Bezpieczeństwo */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">
                7. Zabezpieczenie danych
              </h2>
              <p>
                Administrator stosuje odpowiednie środki techniczne i organizacyjne
                zapewniające ochronę przetwarzanych danych osobowych, w szczególności:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Szyfrowanie połączeń (SSL/TLS)</li>
                <li>Regularne aktualizacje oprogramowania</li>
                <li>Ograniczony dostęp do danych osobowych</li>
                <li>Kopie zapasowe danych</li>
              </ul>
            </div>

            {/* 8. Zmiany */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white">
                8. Zmiany polityki prywatności
              </h2>
              <p>
                Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej
                polityce prywatności. Zmiany wchodzą w życie z dniem publikacji na stronie
                igorchmiel.pl/polityka-prywatnosci. Data ostatniej aktualizacji jest
                umieszczona na górze dokumentu.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
