import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface UserRequest {
  email: string;
  name: string;
  imageUrl: string;
  role: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  const { email, name, imageUrl, role }: UserRequest = await req.json(); // fetching from the request body

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser?.length === 0) {
    const result = await db
      .insert(usersTable)
      .values({
        name: name,
        email: email,
        imageUrl: imageUrl,
        role: role,
      })
      .returning({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        imageUrl: usersTable.imageUrl,
        role: usersTable.role,
        subscriptionId: usersTable.subscriptionId,
      });

    return NextResponse.json(result);
  }

  return NextResponse.json(existingUser[0]);
}
