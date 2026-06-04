import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import fs from "fs/promises";

// Load environment variables locally
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON request parsing support
  app.use(express.json());

  // API route to check if server-side Resend is configured
  app.get("/api/config", (req, res) => {
    const rawResendKey = process.env.RESEND_API_KEY || "";
    const cleanResendKey = rawResendKey.replace(/^["']|["']$/g, "").trim();
    res.json({
      isResendConfigured: !!cleanResendKey,
    });
  });

  // ── Contentful blog posts proxy (keeps token server-side) ────────
  app.get("/api/blog/posts", async (req, res) => {
    const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID || "";
    const token   = process.env.VITE_CONTENTFUL_ACCESS_TOKEN || "";

    if (!spaceId || !token) {
      return res.json({ posts: [] });
    }

    try {
      const cfUrl =
        `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries` +
        `?content_type=blogPage&access_token=${token}&include=1&order=-sys.createdAt`;

      const cfRes = await fetch(cfUrl);
      if (!cfRes.ok) {
        console.warn("Contentful error:", cfRes.status);
        return res.json({ posts: [] });
      }

      const data = await cfRes.json() as any;
      return res.json(data);
    } catch (err: any) {
      console.error("Contentful fetch failed:", err.message);
      return res.json({ posts: [] });
    }
  });

  // Safe server-side email dispatching route through Resend API
  app.post("/api/send", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Uzupełnij wszystkie wymagane pola przed wysyłką." });
    }

    const rawResendKey = process.env.RESEND_API_KEY || "";
    const resendApiKey = rawResendKey.replace(/^["']|["']$/g, "").trim();

    // Return a smart simulation fallback if key is missing, so clients can still fully test and verify the web interface
    if (!resendApiKey) {
      console.warn("Resend API Key is missing. Operating contact form in offline preview simulation mode.");
      return res.json({
        success: true,
        simulated: true,
        message: "Wersja demonstracyjna: formularz działa bezproblemowo! Aby włączyć prawdziwą wysyłkę na adres kontakt@igorchmiel.pl, dodaj klucz RESEND_API_KEY do zmiennych środowiskowych."
      });
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: "Formularz Kontaktowy <kontakt@igorchmiel.pl>",
          to: ["kontakt@igorchmiel.pl"],
          reply_to: email,
          subject: `[Wiadomość z Portfolio] od: ${name}`,
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; padding: 24px; color: #1a1a1a;">
              <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid #f0f0f0; padding-bottom: 12px; color: #111;">
                Nowa wiadomość od klienta
              </h2>
              
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
          `
        })
      });

      const result = await response.json() as any;

      if (!response.ok) {
        console.error("Resend delivery failed:", result);
        return res.status(response.status).json({
          error: result?.message || JSON.stringify(result) || "Wystąpił zewnętrzny błąd podczas wysyłania e-maila."
        });
      }

      console.log("Email sent successfully through Resend server-side!", result);
      return res.json({
        success: true,
        simulated: false,
        id: result.id
      });

    } catch (deliverError: any) {
      console.error("Resend request transport exception:", deliverError);
      return res.status(500).json({
        error: deliverError?.message || "Wystąpił nieoczekiwany błąd serwera podczas wysyłki."
      });
    }
  });

  // Safe server-side email subscription and auto-responder route through MailerLite
  app.post("/api/newsletter/subscribe", async (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Podaj poprawny adres e-mail przed wysyłką." });
    }

    const emailLower = email.toLowerCase().trim();

    // 1. Save subscriber locally in database backup subscribers.json
    try {
      const subscribersFile = path.join(process.cwd(), "subscribers.json");
      let subscribers: any[] = [];
      try {
        const fileData = await fs.readFile(subscribersFile, "utf-8");
        subscribers = JSON.parse(fileData);
      } catch (err: any) {
        subscribers = [];
      }

      const alreadySubscribed = subscribers.some(sub => sub.email === emailLower);

      if (!alreadySubscribed) {
        subscribers.push({
          email: emailLower,
          date: new Date().toISOString(),
          status: "active"
        });
        await fs.writeFile(subscribersFile, JSON.stringify(subscribers, null, 2), "utf-8");
        console.log(`Successfully written subscriber to local backup database: ${emailLower}`);
      } else {
        console.log(`Subscriber already exists locally in backup: ${emailLower}`);
      }
    } catch (dbError: any) {
      console.error("Local JSON database save exception (continuing to MailerLite sync):", dbError);
    }

    // 2. Add to MailerLite external API
    const rawMailerliteKey = process.env.MAILERLITE_API_KEY || "";
    const mailerliteKey = rawMailerliteKey.replace(/^["']|["']$/g, "").trim();

    if (!mailerliteKey) {
      console.warn("MailerLite API key is missing. Simulating template success in local development mode.");
      return res.json({
        success: true,
        message: "Wersja testowa: pomyślnie zapisano w bazie lokalnej! (Dodaj MAILERLITE_API_KEY dla pełnej integracji)."
      });
    }

    const rawGroupId = process.env.MAILER_LITE_GROUP_ID || process.env.MAILERLITE_GROUP_ID || "";
    const groupId = rawGroupId.replace(/^["']|["']$/g, "").trim();

    try {
      console.log(`Contacting MailerLite API to subscribe: ${emailLower}`);

      const payload: any = {
        email: emailLower,
        status: "active"
      };

      if (groupId) {
        payload.groups = [groupId];
      }

      const mlResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${mailerliteKey}`
        },
        body: JSON.stringify(payload)
      });

      if (mlResponse.ok) {
        const mlResult = await mlResponse.json();
        console.log("MailerLite subscription processed successfully:", mlResult);
        return res.json({
          success: true,
          message: "Dziękuję za zapis! Zostałeś pomyślnie dodany do newslettera."
        });
      } else {
        const mlErrorText = await mlResponse.text();
        console.error(`MailerLite API responded with an error (status ${mlResponse.status}):`, mlErrorText);
        
        let friendlyErrorMessage = "Wystąpił błąd podczas rejestracji w MailerLite. Spróbuj ponownie później.";
        try {
          const parsed = JSON.parse(mlErrorText);
          if (parsed.message) {
            friendlyErrorMessage = `MailerLite: ${parsed.message}`;
          }
        } catch (_) {}

        return res.status(mlResponse.status).json({
          error: friendlyErrorMessage
        });
      }
    } catch (mlErr: any) {
      console.error("MailerLite request transport exception:", mlErr);
      return res.status(500).json({
        error: "Nie można nawiązać połączenia z serwerem MailerLite. Sprawdź połączenie sieciowe lub spróbuj ponownie."
      });
    }
  });

  // Vite middleware for development or fallback static file serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server bootstrap error:", err);
  process.exit(1);
});
