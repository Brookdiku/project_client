import axios from "@/lib/axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "phone", type: "text", placeholder: "+251989090909" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await axios.post("/api/auth/signin", {
                    phone: credentials?.phone,
                    password: credentials?.password
                })
                const user = res.data;
                // If no error and we have user data, return it
                if (user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error:"/error"
    },
    
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role
            return { ...token, ...user };
        },
        async session({ session, token }) {
            if (session.user) session.user = token as any;
            return session
        }
    }
})