"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Settings,
  Bell,
  MessageSquare,
  BadgeCheck,
  Building2,
  UserCog,
  ScrollText,
  LineChart,
} from "lucide-react";

import { SearchForm } from "@/components/SearchForm";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import LogoFull from "./custom/LogoFull";
import Image from "next/image";

const menuItems = {
  employee: [
    {
      title: "Dashboard",
      url: "/employee-dashboard",
      icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
    },
    {
      title: "My Profile",
      url: "/profile",
      icon: <Users className="w-4 h-4 mr-2" />,
    },
    {
      title: "Portfolio",
      url: "/portfolio",
      icon: <ScrollText className="w-4 h-4 mr-2" />,
    },
    {
      title: "Interview Requests",
      url: "/interview-requests",
      icon: <FileText className="w-4 h-4 mr-2" />,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: <MessageSquare className="w-4 h-4 mr-2" />,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: <Bell className="w-4 h-4 mr-2" />,
    },
  ],
  employer: [
    {
      title: "Dashboard",
      url: "/employer-dashboard",
      icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
    },
    {
      title: "Talent Search",
      url: "/talent-search",
      icon: <Users className="w-4 h-4 mr-2" />,
    },
    {
      title: "Saved Talents",
      url: "/saved-talents",
      icon: <Briefcase className="w-4 h-4 mr-2" />,
    },
    {
      title: "Interview Requests",
      url: "/interview-requests",
      icon: <FileText className="w-4 h-4 mr-2" />,
    },
    {
      title: "Company Profile",
      url: "/company-profile",
      icon: <Building2 className="w-4 h-4 mr-2" />,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: <MessageSquare className="w-4 h-4 mr-2" />,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      url: "/admin-dashboard",
      icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
    },
    {
      title: "User Management",
      url: "/admin/users",
      icon: <UserCog className="w-4 h-4 mr-2" />,
    },
    {
      title: "Profile Approvals",
      url: "/admin/profile-approvals",
      icon: <BadgeCheck className="w-4 h-4 mr-2" />,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: <LineChart className="w-4 h-4 mr-2" />,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: <Settings className="w-4 h-4 mr-2" />,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole?: "employee" | "employer" | "admin";
}

export function AppSidebar({
  userRole = "employee",
  ...props
}: AppSidebarProps) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const items = menuItems[userRole] || [];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div
          className={`mb-3 ${isCollapsed ? "flex justify-center mt-3" : ""}`}
        >
          {!isCollapsed ? (
            <LogoFull width={24} height={24} textSize="lg" />
          ) : (
            <Link href="/">
              <Image
                src="/logo.svg"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/blur.jpg"
                alt="logo"
                width={20}
                height={20}
              />
            </Link>
          )}
        </div>
        {!isCollapsed && <SearchForm />}
      </SidebarHeader>
      <SidebarContent className="remove-scrollbar">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <Link href={item.url} className="flex items-center">
                      {item.icon}
                      {!isCollapsed && item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
