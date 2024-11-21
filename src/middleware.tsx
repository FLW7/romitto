import { type NextRequest, NextResponse } from 'next/server';

export default function Middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // Если это не страница /lk или токен есть, разрешить переход
  if ((pathname !== '/lk' && pathname !== '/favorite') || token) {
    return NextResponse.next();
  }

  // Если токена нет, перенаправить на главную страницу (или любую другую страницу по вашем выбору)
  const redirectUrl = request.nextUrl.clone();

  redirectUrl.pathname = '/';

  return NextResponse.redirect(redirectUrl);
}
