import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 400 }
      );
    }

    // destination
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    // making buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // final path
    const filePath = path.join(uploadsDir, file.name);

    await writeFile(filePath, buffer);

    // show path for frontend
    const fileUrl = `/uploads/${file.name}`;
    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
