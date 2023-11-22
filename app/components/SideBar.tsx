import Link from "next/link";
import React from "react";

export default function SideBar() {
  return (
    <>
    <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform">
        <a href="#" className="flex items-center pb-4 border-b border-b-gray-800">
            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover"/>
            <span className="text-lg font-bold text-white ml-3">Logo</span>
        </a>
        <ul className="mt-4">
            <li className="mb-1 group active">
                <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i className="ri-home-2-line mr-3 text-lg"></i>
                    <span className="text-sm">Dashboard</span>
                </a>
            </li>
            <li className="mb-1 group">
                <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                    <i className="ri-instance-line mr-3 text-lg"></i>
                    <span className="text-sm">Orders</span>
                    <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                </a>
                <ul className="pl-7 mt-2 hidden group-[.selected]:block">
                    <li className="mb-4">
                        <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Active order</a>
                    </li> 
                    <li className="mb-4">
                        <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Completed order</a>
                    </li> 
                    <li className="mb-4">
                        <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Canceled order</a>
                    </li> 
                </ul>
            </li>
            <li className="mb-1 group">
                <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                    <i className="ri-flashlight-line mr-3 text-lg"></i>
                    <span className="text-sm">Services</span>
                    <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                </a>
                <ul className="pl-7 mt-2 hidden group-[.selected]:block">
                    <li className="mb-4">
                        <a href="#" className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Manage services</a>
                    </li>
                </ul>
            </li>
            <li className="mb-1 group">
                <a href="#" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i className="ri-settings-2-line mr-3 text-lg"></i>
                    <span className="text-sm">Settings</span>
                </a>
            </li>
        </ul>
    </div>
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>
    </>
  );
}
