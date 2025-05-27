import { Outlet } from "react-router"
import { AppSidebar } from "../components/app-sidebar"
import {
  SidebarProvider,
} from "../components/ui/sidebar"

import Navbar  from "../components/Navbar"

export default function Layout() {
  return (
    <SidebarProvider >
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <div className="flex flex-col flex-1 bg-sidebar">
          <Navbar />
          <main className="m-0">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
