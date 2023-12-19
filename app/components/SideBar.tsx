import { Link, Button, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";

export default function SideBar({ isMenuToggled }) {
    //className={`fixed left-0 top-0  bg-blue-600 h-full p-4  sidebar-menu transition-transform shadow-md shadow-black/5`}
    return (
        <>
            <div className={`w-full p-4 flex flex-col h-full ${isMenuToggled ? "items-center" : "items-start"}`} >
                <div className=" flex ">
                    <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover" />
                    {!isMenuToggled ? <span className="text-lg font-bold ml-3" >Logo</span> : <></>}
                </div>
                <div className="flex flex-col gap-2 mt-5 w-full items-center">

                    <Button isIconOnly={!isMenuToggled ? false : true} variant="flat" className={`${!isMenuToggled ? "w-full justify-start" : "justify-center"} flex items-center rounded-md`} >

                        <a href="/admin" className="text-left">
                            {isMenuToggled ? <Tooltip placement="right" content="Dashboard" className="p-4">
                                <i className="ri-dashboard-line text-lg"></i>
                            </Tooltip> : <i className="ri-dashboard-line text-xl"></i>}
                            {!isMenuToggled ? <span className="text-sm ml-3 ">Dashboard</span> : <></>}
                        </a>


                    </Button>
                    <Button isIconOnly={!isMenuToggled ? false : true} variant="flat" className={`${!isMenuToggled ? "w-full justify-start" : "justify-center"} flex items-center rounded-md`} >
                        <a href="/admin/products" className="text-left">
                            <i className="ri-store-line text-xl"></i>
                            {!isMenuToggled ? <span className="text-sm ml-3 ">Products</span> : <></>}
                        </a>
                    </Button>
                    <Button isIconOnly={!isMenuToggled ? false : true} variant="flat" className={`${!isMenuToggled ? "w-full justify-start" : "justify-center"} flex items-center rounded-md`} >
                        <a href="/admin/categories" className="text-left">
                            <i className="ri-menu-search-line text-xl"></i>
                            {!isMenuToggled ? <span className="text-sm ml-3 ">category</span> : <></>}
                        </a>
                    </Button>
                </div>
            </div >
        </>
    );
}
