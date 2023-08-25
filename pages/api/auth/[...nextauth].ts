import { Session, User } from "next-auth/core/types";
import { JWT } from "next-auth/jwt/types";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({session, token, user}: {session: Session, token: JWT, user: User}) {
      session.user.username = session.user.name.split(" ").join("").toLocaleLowerCase();
      session.user.uid = token.sub;

      return session
    }
  }
};
export default NextAuth(authOptions);
