import { cookies } from "next/headers";
import { AppSidebar } from "@/components/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { UserButton } from "@clerk/nextjs";
import ModeToggle from "@/components/ModeToggle";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const clerkUser = await currentUser();

  let user;
  if (clerkUser) {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, clerkUser.emailAddresses[0].emailAddress));

    if (existingUser?.length > 0) {
      user = existingUser[0];
    }
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        } as Record<string, string>
      }
    >
      <AppSidebar
        variant="floating"
        collapsible="icon"
        userRole={user?.role as "employee" | "employer" | "admin"}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <ModeToggle bg="transparent" />
          </div>
          <div className="flex items-center gap-2">
            <UserButton />
            <div className="flex flex-col">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
          </div>
        </header>
        <main className="flex h-full w-full flex-col overflow-hidden p-5">
          <div className="flex h-full w-full flex-1 overflow-hidden">
            <div className="flex h-full w-full flex-1 overflow-hidden">
              {children}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
