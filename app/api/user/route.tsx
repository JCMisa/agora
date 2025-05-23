import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface UserRequest {
  clerkId: string;
  email: string;
  name: string;
  imageUrl: string;
  role: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  const { clerkId, name, email, imageUrl, role }: UserRequest =
    await req.json(); // fetching from the request body

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser?.length === 0) {
    const result = await db
      .insert(usersTable)
      .values({
        clerkId: clerkId,
        name: name,
        email: email,
        imageUrl: imageUrl,
        role: role,
      })
      .returning({
        id: usersTable.id,
        clerkId: usersTable.clerkId,
        name: usersTable.name,
        email: usersTable.email,
        imageUrl: usersTable.imageUrl,
        headline: usersTable.headline,
        bio: usersTable.bio,
        location: usersTable.location,
        resumeUrl: usersTable.resumeUrl,
        linkedinUrl: usersTable.linkedinUrl,
        githubUrl: usersTable.githubUrl,
        portfolioUrl: usersTable.portfolioUrl,
        role: usersTable.role,
        subscriptionId: usersTable.subscriptionId,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
      });

    return NextResponse.json(result);
  }

  return NextResponse.json(existingUser[0]);
}
