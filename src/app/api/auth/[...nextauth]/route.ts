import NextAuth from "next-auth";
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'
import {dbConnect} from "@/utils/dbConnect";
import UsersModel from "@/utils/models/usersModel";

export const authOptions: NextAuthOptions = {
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_ID!,
            clientSecret : process.env.GOOGLE_SECRET!
        })
    ],
    session:  {
        maxAge : 60 * 24 * 60 * 60,
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET!,
    pages: {
        signIn: '/',
        error: '/'
    },
    callbacks : {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({session , user , token} : any) {
            await dbConnect()
            const getUser = await UsersModel.findOne({ email: token.email.toLowerCase() });
            session.user = getUser
            return session
        },
        async signIn({ user , account , profile } : any) {
            await dbConnect()
            try {
            const findUser = await UsersModel.findOne({ email: profile.email.toLowerCase() });

                if(!findUser) {
                    throw Error (`NotExist`);
                }

                if(!findUser.fName || !findUser.lName || !findUser.fullName) {
                    await UsersModel.findByIdAndUpdate(findUser._id , {
                        fName : profile.given_name,
                        lName : profile.family_name,
                        fullName : profile.name,
                    })
                }


                    return true;
            } catch (err) {
                throw err;
                return false
            }
            return true
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };