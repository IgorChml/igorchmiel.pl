import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Uzupełnij wszystkie wymagane pola przed wysyłką.' },
      { status: 400 }
    );
  }

  const rawResendKey = process.env.RESEND_API_KEY || '';
  const resendApiKey = rawResendKey.replace(/^["']|["']$/g, '').trim();

  if (!resendApiKey) {
    return NextResponse.json({
      success: true,
      simulated: true,
      message: 'Wersja demonstracyjna: formularz działa bezproblemowo! Aby włączyć prawdziwą wysyłkę na adres kontakt@igorchmiel.pl, dodaj klucz RESEND_API_KEY.',
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Formularz Kontaktowy <kontakt@igorchmiel.pl>',
        to: ['kontakt@igorchmiel.pl'],
        reply_to: email,
        subject: `[Wiadomość z Portfolio] od: ${name}`,
        html: `
          <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; padding: 24px; color: #1a1a1a;">
            <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid #f0f0f0; padding-bottom: 12px; color: #111;">Nowa wiadomość od klienta</h2>
            <div style="margin-bottom: 20px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #666; letter-spacing: 0.5px;">Imię i nazwisko</p>
              <p style="margin: 0; font-size: 15px; color: #111; font-weight: 500;">${name}</p>
            </div>
            <div style="margin-bottom: 20px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #666; letter-spacing: 0.5px;">Adres E-mail</p>
              <p style="margin: 0; font-size: 15px; color: #111;"><a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a></p>
            </div>
            <div style="margin-bottom: 24px; background-color: #fafafa; border-left: 3px solid #111; border-radius: 4px; padding: 16px;">
              <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #666; letter-spacing: 0.5px;">Wiadomość</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #222; white-space: pre-wrap;">${message}</p>
            </div>
            <div style="font-size: 11px; color: #888; text-align: center; border-top: 1px solid #f0f0f0; padding-top: 16px; margin-top: 24px;">
              Wiadomość dostarczona bezpiecznie za pomocą integracji Resend z Twojego portfolio igorchmiel.pl.
            </div>
          </div>
        `,
      }),
    });

    const result = (await response.json()) as any;

    if (!response.ok) {
      return NextResponse.json(
        { error: result?.message || 'Wystąpił zewnętrzny błąd podczas wysyłania e-maila.' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, simulated: false, id: result.id });
  } catch (deliverError: any) {
    return NextResponse.json(
      { error: deliverError?.message || 'Wystąpił nieoczekiwany błąd serwera podczas wysyłki.' },
      { status: 500 }
    );
  }
}
