
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Mock User ID for now
const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { questId, status, codeSubmission } = body;

        // 1. Find or create the quest progress entry
        // In a real app, we'd upsert based on composite key (userId, questId)
        // Prisma's upsert works best with @unique constraints on the composite, which we haven't strictly enforced in the schema access pattern yet
        // So we'll findFirst and then update or create.

        const existingProgress = await prisma.userProgress.findFirst({
            where: {
                userId: MOCK_USER_ID,
                questId: questId
            }
        });

        let progress;
        if (existingProgress) {
            progress = await prisma.userProgress.update({
                where: { id: existingProgress.id },
                data: {
                    status,
                    codeSubmission,
                    completedAt: status === 'COMPLETED' ? new Date() : undefined
                }
            });
        } else {
            progress = await prisma.userProgress.create({
                data: {
                    userId: MOCK_USER_ID,
                    questId,
                    status,
                    codeSubmission,
                    completedAt: status === 'COMPLETED' ? new Date() : undefined
                }
            });
        }

        return NextResponse.json(progress);

    } catch (error) {
        console.error("Failed to update progress:", error);
        return NextResponse.json(
            { error: "Failed to update quest progress" },
            { status: 500 }
        );
    }
}
