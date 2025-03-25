import { NextResponse } from 'next/server';

export function middleware() {
  return NextResponse.redirect('https://wbso.ai');
}

export const config = {
  matcher: '/:path*',
}; 