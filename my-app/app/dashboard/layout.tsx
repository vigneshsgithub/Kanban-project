import { ReactNode } from "react";
import Sidebar from "../Sidebar";



export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="w-81 sidebar-main-container">
       <Sidebar/>
      </div>
      <main className="flex-1 ">{children}</main>
    </div>
  );
}