import { NextResponse } from "next/server";
import { gameService, initializeGameService } from "@/lib/container";
import { validateDayIndex } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    // Ensure service is initialized
    try {
      await initializeGameService();
    } catch (initError) {
      console.error("Failed to initialize game service:", initError);
      return NextResponse.json(
        { error: "Failed to initialize game service" },
        { status: 500 },
      );
    }

    // Handle potential empty body
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch (_e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { dayIndex } = body;

    if (!dayIndex || typeof dayIndex !== "number") {
      return NextResponse.json(
        { error: "Патрабуецца dayIndex" },
        { status: 400 },
      );
    }

    // Validate dayIndex parameter
    const currentDayIndex = gameService.getDailySecret().dayIndex;
    if (!validateDayIndex(dayIndex, currentDayIndex)) {
      return NextResponse.json({ error: "Invalid dayIndex" }, { status: 400 });
    }

    // Use provided dayIndex or fallback to current day
    const targetDayIndex = dayIndex ?? gameService.getDailySecret().dayIndex;

    // Get the target word for the specified day
    const targetWord = gameService.getTargetWord(targetDayIndex);

    return NextResponse.json({
      targetWord,
      dayIndex: targetDayIndex,
    });
  } catch (error) {
    console.error("API /api/target-word Error:", error);
    return NextResponse.json({ error: "Памылка сервера" }, { status: 500 });
  }
}
