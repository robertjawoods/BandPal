import { auth } from "@/app/auth"
import { NextResponse } from "next/server";

export default auth((req) => {
    if (req.nextUrl.pathname.match("/((?!api|_next/static|_next/image|favicon.ico|^/).*)"))
    {
        // console.log('matched')
        return;
    }

    if (!req.auth?.user) {
        const url = req.nextUrl.clone();
        url.pathname = "/api/auth/signin";
        console.log('redirecting to login')
        return NextResponse.redirect(url);
    }
})

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico|^/).*)"] }