import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login'
  const token = request.cookies.get('jwt')?.value || ''
  if (isPublicPath && token) {
    return await NextResponse.redirect(new URL('/',request.nextUrl))
  }
  if (!isPublicPath && !token){
    return await NextResponse.redirect(new URL('login', request.nextUrl))
  }
}
 

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/login',
    '/products',
    '/customers',
    '/sales'
  ],
}