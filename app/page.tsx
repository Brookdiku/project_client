"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import AppNavBar from "./components/Navbar";
import { useRouter } from "next/router";
import Items from "./components/Items";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

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
        <div className=" bg-background  w-10/12 absolute top-64 text-xl font-bold container min-h-screen h-full flex  items-center justify-center">
          <div className="flex flex-col p-4 w-3/12 h-full">
          <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize"
                        >
                          {/* {selectedValue} */}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        // selectedKeys={selectedKeys}
                        // onSelectionChange={setSelectedKeys}
                      >
                        <DropdownItem key="category">Category</DropdownItem>
                        <DropdownItem key="number">Electronics</DropdownItem>
                        <DropdownItem key="date">Food</DropdownItem>
                        <DropdownItem key="single_date">Home Appliances</DropdownItem>
                        <DropdownItem key="iteration">Cloth</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
          </div>
          <div className="flex flex-col w-9/12 p-4  h-full">
            <main id="product" className="">
              {/* <Items/> */}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
