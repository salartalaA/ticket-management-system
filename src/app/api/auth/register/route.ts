import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const registerBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = registerBodySchema.parse(await req.json());
    const { name, email, password } = body;

    if (password.length < 6)
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser)
      return NextResponse.json(
        { message: "Email already exists!" },
        { status: 409 }
      );

    const genSalt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in register route: ", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
