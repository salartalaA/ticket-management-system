"use server";

import { Department, TicketStatus } from "@prisma/client";
import { prisma } from "../prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface CreateTicketData {
  title: string;
  department: Department;
  description?: string;
  fileUrl?: string;
}

export async function createTicket(data: CreateTicketData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  if (!data.title || !data.department)
    throw new Error("Title and department are required");

  try {
    const newTicket = await prisma.ticket.create({
      data: {
        ...data,
        status: TicketStatus.PENDING,
        userId: session?.user.id,
      },
    });

    return newTicket;
  } catch (error) {
    console.log("Error in add-ticket:", error);
    throw new Error("Failed to create new ticket");
  }
}
