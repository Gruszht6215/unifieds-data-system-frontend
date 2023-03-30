import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string & DefaultSession["accessToken"]
    user: {
      ID: string
      Username: string
      Password: string
      Role: string
      Host: string
      Token: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    user: {
      ID: string
      Username: string
      Password: string
      Role: string
      Host: string
      Token: string
    } & DefaultSession["user"]
  }
}