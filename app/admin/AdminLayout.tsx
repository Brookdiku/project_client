
import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import TopNavBar from '../components/TopNavbar';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ismenuToggled, setIsMenuToggled] = useState<boolean>(false)
  const handleToggle = () => {
    ismenuToggled ? setIsMenuToggled(false) : setIsMenuToggled(true)
  }
  // w-80 bg-red-500 md:w-[calc(100%-256px)] md:ml-64 min-h-screen transition-all main
  // {`${ismenuToggled ? "w-[calc(100%-64px)]" : "w-[calc(100%-256px)]"}`}
  return (
    <div className=" flex flex-row text-foreground  w-full h-screen bg-background ">
      <div className={`${ismenuToggled ? "w-16" : "w-64"} h-full `}>
        <SideBar isMenuToggled={ismenuToggled} />
      </div>
      <div className="h-full w-full ">
        <TopNavBar handleToggle={handleToggle} />
        <main className='p-5 '>
          {children}
        </main>
      </div>
    </div>
  );
}
