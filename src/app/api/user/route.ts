
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Mock User ID for now since we don't have auth
const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

export async function GET() {
    try {
        // Try to find the mock user
        let user = await prisma.user.findUnique({
            where: { id: MOCK_USER_ID },
        });

        // If no user exists, create one (Seed data)
        if (!user) {
            user = await prisma.user.create({
                data: {
                    id: MOCK_USER_ID,
                    username: "Novice Coder",
                    classType: "Novice",
                    level: 1,
                    xp: 0,
                    logic: 10,
                    memory: 10,
                },
            });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return NextResponse.json(
            { error: "Failed to fetch user data" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { logic, memory, xp, level, classType } = body;

        const updatedUser = await prisma.user.update({
            where: { id: MOCK_USER_ID },
            data: {
                logic,
                memory,
                xp,
                level,
                classType,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Failed to update user:", error);
        return NextResponse.json(
            { error: "Failed to update user data" },
            { status: 500 }
        );
    }
}
