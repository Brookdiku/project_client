"use client"
import { useSession } from "next-auth/react"
import axios from "../axios";

export const useRefreshToken = () => {
    const { data: session } = useSession();
    const refreshToken = async () => {
        if (session) {
            const res = await axios.post("/api/auth/refresh", {
                id: session?.user.id,
                refresh: session?.user.token.refreshToken
            });
            session.user.token.accessToken = res.data.accessToken;
        } 
    }
    return refreshToken
}