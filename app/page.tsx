"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import AppNavBar from "./components/Navbar";
import { useRouter } from "next/router";

export default function Home() {
  const handleLocalChange = (l:string) => {
  };
  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <AppNavBar handleLocalChange={handleLocalChange}/>
        <div className=" text-xl font-bold container h-72 -mt-10  flex flex-col items-center justify-center">
          <p>WELCOME TO APEX SHOPPING</p>
          <span>cool</span>
        </div>
        <div className=" w-11/12 absolute top-64 text-xl font-bold container min-h-screen bg-purple flex flex-col items-center justify-center">
          haha
        </div>
      </div>
    </>
  );
}
