import { DefaultUser, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./mongo-adapter";
import { Users } from "./mongoose";

type User = DefaultUser & {
    isNewUser: boolean
    sub: string
}

declare module "next-auth" {
    interface Session {
        user: User
    }
}

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async jwt({ token, user, profile }) {
            return token
        },
        async session({  session, token }) {
            const existingUser = await Users.findById(token.sub)
            if(!existingUser.isAccountConfirmed){
                session.user.isNewUser = true
            }else{
                session.user.isNewUser = false
            }
            session.user.sub = token.sub!
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET
}