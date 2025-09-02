// src/actions/upload-pin-action.ts
'use server'
import { PinterestClient } from "@/lib/pinterest-utils/pinterest-client";
import { prisma } from "@/lib/prisma";
 

interface UploadPinInput {
  userId: string;
  boardId: string;
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string;
}

export async function uploadPinAction(input: UploadPinInput) {
  try {
    const { userId, boardId, title, description, imageUrl, linkUrl } = input;

    // Get user's Pinterest account
    const account = await prisma.account.findFirst({
      where: { userId, provider: "pinterest" },
    });

    if (!account?.access_token) {
      throw new Error("No Pinterest account connected");
    }

    // Create pin using Pinterest API
    const client = new PinterestClient(account.access_token);
    const result = await client.createPin(boardId, {
      title,
      description,
      image_url: imageUrl,
      link: linkUrl,
    });

    // Save to database
    await prisma.scheduledPin.create({
      data: {
        userId,
        boardId,
        title,
        description: description || "",
        imageUrl,
        linkUrl: linkUrl || "",
        scheduledAt: new Date(),
        status: "SUCCESS",
        pinId: result.id,
      },
    });

    return { success: true, pinId: result.id };
  } catch (error: any) {
    console.error("Pin creation error:", error);
    
    // Save error to database
    if (input.userId) {
      await prisma.scheduledPin.create({
        data: {
          userId: input.userId,
          boardId: input.boardId,
          title: input.title,
          description: input.description || "",
          imageUrl: input.imageUrl,
          linkUrl: input.linkUrl || "",
          scheduledAt: new Date(),
          status: "FAILED",
          error: error.message.substring(0, 500),
        },
      });
    }

    return { success: false, error: error.message };
  }
}