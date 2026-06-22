import { NextResponse } from 'next/server';

export async function GET() {
  const rawResendKey = process.env.RESEND_API_KEY || '';
  const cleanResendKey = rawResendKey.replace(/^["']|["']$/g, '').trim();

  return NextResponse.json({
    isResendConfigured: !!cleanResendKey,
  });
}
