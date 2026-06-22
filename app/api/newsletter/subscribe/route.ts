import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json(
      { error: 'Podaj poprawny adres e-mail przed wysyłką.' },
      { status: 400 }
    );
  }

  const emailLower = email.toLowerCase().trim();

  const rawMailerliteKey = process.env.MAILERLITE_API_KEY || '';
  const mailerliteKey = rawMailerliteKey.replace(/^["']|["']$/g, '').trim();

  if (!mailerliteKey) {
    return NextResponse.json({
      success: true,
      message: 'Wersja testowa: pomyślnie zapisano! (Dodaj MAILERLITE_API_KEY dla pełnej integracji).',
    });
  }

  const rawGroupId = process.env.MAILERLITE_GROUP_ID || '';
  const groupId = rawGroupId.replace(/^["']|["']$/g, '').trim();

  try {
    const payload: any = { email: emailLower, status: 'active' };
    if (groupId) payload.groups = [groupId];

    const mlResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${mailerliteKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (mlResponse.ok) {
      return NextResponse.json({
        success: true,
        message: 'Dziękuję za zapis! Zostałeś pomyślnie dodany do newslettera.',
      });
    } else {
      const mlErrorText = await mlResponse.text();
      let friendlyErrorMessage = 'Wystąpił błąd podczas rejestracji w MailerLite. Spróbuj ponownie później.';
      try {
        const parsed = JSON.parse(mlErrorText);
        if (parsed.message) friendlyErrorMessage = `MailerLite: ${parsed.message}`;
      } catch {}

      return NextResponse.json({ error: friendlyErrorMessage }, { status: mlResponse.status });
    }
  } catch {
    return NextResponse.json(
      { error: 'Nie można nawiązać połączenia z serwerem MailerLite. Sprawdź połączenie sieciowe lub spróbuj ponownie.' },
      { status: 500 }
    );
  }
}
