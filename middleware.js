
import { NextResponse } from 'next/server';

export function middleware(request) {
  let token = "", isAuthPage = false;
  let authPages = ['/Employees', '/dashboard', '/policies', '/add-employee', '/designation'];
  const currentPage = request.nextUrl.pathname;

  if (authPages.includes(currentPage)) {
    isAuthPage = true;
  }

  if (request.cookies.has('token')) {
    token = request.cookies.get('token')?.value;
  }

  if (token !== "" && isAuthPage === true) {
    return NextResponse.next();
  }

  if (token !== "" && (currentPage === "/login" || currentPage === "/sign-up")) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (token === "" && isAuthPage === true) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/Employees', '/policies', '/add-employee', '/designation', '/login', '/sign-up'],
};
