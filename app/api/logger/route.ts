import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { logType, method } = await req.json();
  const logger = await import('@/lib/logger');

  if (logType === 'info') {
    // @ts-ignore
    logger.info('HTTP Request Log', {
      method,
      timestamp: new Date().toISOString(),
    });
  }

  return NextResponse.json({ success: true });
}
