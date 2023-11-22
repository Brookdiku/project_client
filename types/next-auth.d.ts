// import NextAuth from "next-auth";
// declare module "next-auth" {
//     interface Session {
//         user: {
//             id: number,
//             role: string,
//             token: {
//                 accessToken: string,
//                 refreshToken: string
//             }
//         }
//     }
// }
import { DefualtSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"
declare module "next-auth" {
    interface Session {
        user: {
            id: number,
            role: string,
            token: {
                accessToken: string,
                refreshToken: string
            }
        } & DefualtSession
    }
    interface User extends DefaultUser {
        role: string,
    }
}
declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string
    }
}