"use client"
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { axiosAuth } from "../axios";
import { useRefreshToken } from "./useRefreshToken";
const useAxiosAuth = () => {
    const { data: session } = useSession();
    const refreshToken = useRefreshToken();
    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use((config) => {
            if (!config.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${session?.user.token.accessToken}`
            }
            return config;
        },
            (error) => {
                return Promise.reject(error)
            })
        const responseIntercept = axiosAuth.interceptors.response.use((response) => response, async (error) => {
            const prevRequest = error.config;
            if (error.response.status === 401 && !prevRequest.sent) {
                prevRequest.sent = true
                await refreshToken();
                prevRequest.headers["Authorization"] = `Bearer ${session?.user.token.accessToken}`;
                return axiosAuth(prevRequest);
            }
            return Promise.reject(error)
        })
        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept)
            axiosAuth.interceptors.response.eject(responseIntercept)
        }
    }, [session])

    return axiosAuth;
}
export default useAxiosAuth;

//     const { data: session } = useSession();
//const refreshToken = useRefreshToken();
//const useAxiosAuth = () => {
// useEffect(() => {

//         const requestIntercept = axiosAuth.interceptors.request.use((config) => {
//             if (!config.headers["Authorization"]) {
//                 config.headers["Authorization"] = `Bearer ${session?.user.token.accessToken}`
//             }
//             return config;
//         })
//         return () => {
//             axiosAuth.interceptors.request.eject(requestIntercept)
//         }
// }, [session])
//  return axiosAuth;}
// export default useAxiosAuth;