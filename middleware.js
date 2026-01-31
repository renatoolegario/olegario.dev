import { NextResponse } from "next/server";

export function middleware(req) {
    const url = req.nextUrl;
    const pathname = url.pathname;

    // Se vier /api/.../ com barra final, reescreve para /api/... sem redirecionar (sem 307)
    if (pathname.startsWith("/api/") && pathname.length > 4 && pathname.endsWith("/")) {
        url.pathname = pathname.slice(0, -1);
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/:path*"],
};
