import React, { useState } from "react";
import SideBar from "../components/SideBar";
import TopNavBar from "../components/TopNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const handleToggle = () => {
    isMenuToggled ? setIsMenuToggled(false) : setIsMenuToggled(true);
  };

  return (
    <div className=" flex flex-row text-foreground  w-full h-screen bg-background ">
      <div
        className={`dark:bg-black bg-white ${
          isMenuToggled ? "w-16" : "w-64"
        } h-full md:relative md:block transition-all duration-300 ease-in-out ${
          !isMenuToggled ? "z-50 absolute left-0 md:static" : "hidden"
        }`}
      >
        <SideBar isMenuToggled={isMenuToggled} handleToggle={handleToggle}/>
      </div>
      <div className="flex flex-grow flex-col w-full">
        <TopNavBar handleToggle={handleToggle} />
        <main className="p-5 flex-grow">{children}</main>
      </div>
    </div>
  );
}
