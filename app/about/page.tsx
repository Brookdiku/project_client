"use client";

import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useRouter } from 'next/navigation'
import React, { useState } from "react";

const page = () => {
  const router = useRouter();
  const [me, setMe] = useState();
  const axiosAuth = useAxiosAuth();
  const fetchPost = async () => {
    const res = await axiosAuth.get("/suppliers/me");
    if (res.status == 200) {
      setMe(res.data);
    } else {
      router.push("/")
    }
  };
  return (
    <>
      <button onClick={fetchPost}>fetch me</button>
      <button onClick={() => setMe(undefined)}>clear</button>
      <div>
        {me === undefined ? " you are not authorized " : JSON.stringify(me)}
      </div>
    </>
  );
};

export default page;
