import { auth } from "@/app/auth"
export default auth((req) => {
    console.log('middleware', req.nextUrl)

    if (req.nextUrl.pathname.match("/((?!api|_next/static|_next/image|favicon.ico|^/).*)"))
    {
        console.log('matched')
        return;
    }

    if (!req.auth?.user) {
        const url = req.nextUrl.clone();
        url.pathname = "/api/auth/signin";
        console.log('redirecting to login')
        return Response.redirect(url);
    }
})

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico|^/).*)"] }