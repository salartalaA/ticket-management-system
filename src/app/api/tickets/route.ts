import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json(
      { message: "Unauthorized - No session" },
      { status: 404 }
    );

  try {
    const tickets = await prisma.ticket.findMany({
      where: { userId: session.user.id },
    });

    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.log("Error in tickets route: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
