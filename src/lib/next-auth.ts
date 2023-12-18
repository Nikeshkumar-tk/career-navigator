import { DefaultUser, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./mongo-adapter";
import { Users } from "./mongoose";

type User = DefaultUser & {
    isAccountConfirmed: boolean
    sub: string
    attendedQuizs: Array<Record<string, string>>
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
        async session({ session, token }) {
            const existingUser = await Users.findById(token.sub)
            delete existingUser._id
            session.user.sub = token.sub!
            session.user = {
                ...session.user,
                ...JSON.parse(JSON.stringify(existingUser))
            }
            return session
        },
    },
    events: {
        signIn({ isNewUser, user }) {
            console.log(isNewUser, user)
            if (isNewUser) {
                Users.findOneAndUpdate({ email: user.email }, {
                    isAccountConfirmed: false,
                    attendedQuizs: []
                })
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}