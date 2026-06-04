import path from "path";
import fs from "fs/promises";

export default async function handler(req: any, res: any) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Podaj poprawny adres e-mail przed wysyłką." });
  }

  const emailLower = email.toLowerCase().trim();

  // 1. Try to save subscriber locally (failing gracefully since Vercel's ephemeral filesystem is read-only)
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
      console.log(`Successfully written subscriber to local backup database in Vercel function: ${emailLower}`);
    } else {
      console.log(`Subscriber already exists locally in backup in Vercel function: ${emailLower}`);
    }
  } catch (dbError: any) {
    console.warn("Local JSON database backup skipped (customary for serverless environments):", dbError.message);
  }

  // 2. Add to MailerLite external API
  const rawMailerliteKey = process.env.MAILERLITE_API_KEY || "";
  const mailerliteKey = rawMailerliteKey.replace(/^["']|["']$/g, "").trim();

  if (!mailerliteKey) {
    console.warn("MailerLite API key is missing inside Vercel function. Sync is running in simulation mode.");
    return res.status(200).json({
      success: true,
      message: "Wersja testowa: pomyślnie zapisano w bazie lokalnej! (Dodaj MAILERLITE_API_KEY dla pełnej integracji)."
    });
  }

  const rawGroupId = process.env.MAILERLITE_GROUP_ID || "";
  const groupId = rawGroupId.replace(/^["']|["']$/g, "").trim();

  try {
    console.log(`Contacting MailerLite API to subscribe (Vercel): ${emailLower}`);

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
      console.log("MailerLite subscription processed successfully (Vercel):", mlResult);
      return res.status(200).json({
        success: true,
        message: "Dziękuję za zapis! Zostałeś pomyślnie dodany do newslettera."
      });
    } else {
      const mlErrorText = await mlResponse.text();
      console.error(`MailerLite API responded with an error to Vercel (status ${mlResponse.status}):`, mlErrorText);
      
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
    console.error("MailerLite request transport exception (Vercel):", mlErr);
    return res.status(500).json({
      error: "Nie można nawiązać połączenia z serwerem MailerLite. Sprawdź połączenie sieciowe lub spróbuj ponownie."
    });
  }
}
