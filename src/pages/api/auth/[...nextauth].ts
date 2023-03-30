import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const loginAPI = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/login";
        const res = await fetch(loginAPI, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          return res.json();
        })
          .catch((err) => {
            console.log(err)
          });
        // const data = await res.json();
        if (res.status == "success") {
          // Any object returned will be saved in `user` property of the JWT
          return res.user;
        }
        else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 2 * 60 * 60, // 2 hours
    // updateAge:,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.user = user
      }
      return token
    },
    async session({ session, token, user }) {
      const userData = token.user
      const jwtToken = token.user.Token
      session.accessToken = jwtToken
      session.user = userData
      return session // The return type will match the one returned in `useSession()`
    },
  },
};

export default NextAuth(authOptions);