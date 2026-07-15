import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIX = "/admin";
const LOGIN_PATH = "/login";

/**
 * Refresca la sesión de Supabase en cada request y protege las rutas /admin.
 * Debe ejecutarse desde middleware.ts en la raíz del proyecto.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // No usar getSession() aquí: getUser() revalida el token contra Supabase
  // en vez de confiar ciegamente en la cookie.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtectedRoute = pathname.startsWith(PROTECTED_PREFIX);
  const isLoginRoute = pathname.startsWith(LOGIN_PATH);

  if (isProtectedRoute && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = LOGIN_PATH;
    redirectUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isLoginRoute && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = PROTECTED_PREFIX;
    redirectUrl.searchParams.delete("redirectTo");
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
