
import React from 'react';
import SideBar from '../components/SideBar';
import TopNavBar from '../components/TopNavbar';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-foreground bg-background ">
      <SideBar />
      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 min-h-screen transition-all main">
        <TopNavBar />
        <div className='p-5 '>
          {children}
        </div>
      </main>
    </div>
  );
}