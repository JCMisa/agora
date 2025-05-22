import HomeHero from "@/components/custom/HomeHero";
import HomeNavbar from "@/components/custom/HomeNavbar";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { eq } from "drizzle-orm";

export default async function Home() {
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

  return (
    <>
      <HomeNavbar user={user as UserType} />
      <HomeHero user={user as UserType} />
    </>
  );
}
