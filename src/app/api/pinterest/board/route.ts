// src/app/api/pinterest/boards/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PinterestClient } from "@/lib/pinterest-utils/pinterest-client";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = new PinterestClient(session.accessToken as string);
    const boards = await client.getBoards();
    
    return NextResponse.json(boards);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public directory (for demo - use cloud storage in production)
    const filename = `pin-${Date.now()}-${image.name}`;
    const path = join(process.cwd(), "public/uploads", filename);
    
    await writeFile(path, buffer);

    const imageUrl = `${process.env.NEXTAUTH_URL}/uploads/${filename}`;

    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}