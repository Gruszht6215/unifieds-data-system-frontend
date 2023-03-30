export { default } from "next-auth/middleware"

export const config = { matcher: [
    "/",
    "/dashboard",
    "/connection-profile",
    "/manage-database",
    "/classification",
]}

// export function middleware(req: NextRequest) {
//     let currentUrl = req.nextUrl.pathname
//     // const { data: session } = useSession()

//     // if (session && !(currentUrl.includes('auth/login'))) {
//     //     return NextResponse.redirect(new URL('/auth/login', req.url).toString())
//     // }
// }