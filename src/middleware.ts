import { NextResponse } from 'next/server';

export function middleware() {
  return NextResponse.redirect('https://wbso.ai', {
    status: 308 // Permanent redirect
  });
}

export const config = {
  matcher: '/:path*',
}; 