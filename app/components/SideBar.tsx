import { Link } from "@nextui-org/react";
import React from "react";

export default function SideBar() {
  return (
    <>
    <div className=" fixed left-0 top-0 w-64 h-full  p-4 z-50 sidebar-menu transition-transform shadow-md shadow-black/5">
        <a href="/" className="flex items-center pb-4 border-b border-b-gray-800">
            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover"/>
            <span className="text-lg font-bold ml-3">Logo</span>
        </a>
        <ul className="mt-4">
            <li className="mb-1 group active">
                <Link href="/admin" className="flex items-center py-2 px-4  rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i className="ri-home-2-line mr-3 text-lg"></i>
                    <span className="text-sm">Dashboard</span>
                </Link>
            </li>
            <li className="mb-1 group active">
                <Link href="/admin/products" className="flex items-center py-2 px-4  rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i className="ri-home-2-line mr-3 text-lg"></i>
                    <span className="text-sm">Products</span>
                </Link>
            </li>
            <li className="mb-1 group active">
                <Link href="/admin/products" className="flex items-center py-2 px-4  rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i className="ri-home-2-line mr-3 text-lg"></i>
                    <span className="text-sm">Category</span>
                </Link>
            </li>
            <li className="mb-1 group active">
                <Link href="/admin/products" className="flex items-center py-2 px-4  rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i className="ri-home-2-line mr-3 text-lg"></i>
                    <span className="text-sm">Sub Category</span>
                </Link>
            </li>
        </ul>
    </div>
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>
    </>
  );
}
