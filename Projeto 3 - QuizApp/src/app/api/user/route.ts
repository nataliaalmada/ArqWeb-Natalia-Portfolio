import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, name } = await await request.json();
  const users = await prisma.user.upsert({
    create: { email, name },
    update: { name },
    where: { email },
  });
  return NextResponse.json({ users });
}