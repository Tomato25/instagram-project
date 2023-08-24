import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"



export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      })
  ],

}
export default NextAuth(authOptions)