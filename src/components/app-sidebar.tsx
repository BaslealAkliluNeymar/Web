import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  PieChartIcon,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "../components/nav-main"

import { NavUser } from "../components/nav-user"
import { TeamSwitcher } from "../components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,

} from "../components/ui/sidebar"
import { selectPermission } from "../utils/selector"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "FITSCS",
      logo: GalleryVerticalEnd,
      plan: "Corporation",
    }
  ],
  navMain: [
    {
      title:"Dashboard",
      url: "/admin/dashboard",
      icon: PieChartIcon,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          permisssion: selectPermission('pickup','read')
        },
      ]
    },
    {
      title: "Operations Report",
      url: "/operations",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Pickups",
          url: "/admin/pickups",
          permisssion: selectPermission('pickup','update')
        },
        {
          title: "Deliveries",
          url: "/admin/deliveries",
          permisssion: selectPermission('pickup','update')
        },
        {
          title: "Routes",
          url: "/admin/routes",
          permisssion: selectPermission('pickup','update')
        },
        {
          title: "Vehicles",
          url: "/admin/vehicles",
          permisssion: selectPermission('pickup','write')
        },
        {
          title: "Facility",
          url: "/admin/facilities",
          permisssion: selectPermission('pickup','write')
        },
        // },
        // {
        //   title: "User Registration",
        //   url: "/admin/users",
        //   permisssion: selectPermission('pickup','write')
        // },
         {
          title: "Data",
          url: "/admin/reports",
          permisssion: selectPermission('pickup','write')
        },
      ],
    },
    {
      title: "SOS Report",
      url: "",
      icon: Bot,
      items: [
        {
          title: "SOS",
          url: "/admin/sos",
          permisssion: selectPermission('pickup','write')
        }
      ],
    },
    {
      title: "Geofence Report",
      url: "/",
      icon: BookOpen,
      items: [
        {
          title: "Geofence Report",
          url: "/admin/geofence",
          permisssion: selectPermission('pickup','write')
        }
      ],
    },
    {
      title: "Ticket",
      url: "/admin/ticket",
      icon: Settings2,
      items: [
        {
          title: "Ticket",
          url: "ticket",
          permisssion: selectPermission('pickup','write')
        }
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
