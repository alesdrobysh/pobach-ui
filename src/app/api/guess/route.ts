import { NextResponse } from "next/server";
import { gameService, initializeGameService } from "@/lib/container";
import { validateDayIndex } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    // Ensure service is initialized (lazy loading)
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

    const { word, dayIndex } = body;

    if (!word || typeof word !== "string") {
      return NextResponse.json({ error: "Патрабуецца слова" }, { status: 400 });
    }

    // Validate dayIndex parameter
    const currentDayIndex = gameService.getDailySecret().dayIndex;
    if (!validateDayIndex(dayIndex, currentDayIndex)) {
      return NextResponse.json({ error: "Invalid dayIndex" }, { status: 400 });
    }

    const result = gameService.makeGuess(word, dayIndex);

    // Return the dayIndex that was used (provided or current)
    const responseDayIndex = dayIndex ?? gameService.getDailySecret().dayIndex;

    return NextResponse.json({
      ...result,
      dayIndex: responseDayIndex,
    });
  } catch (error) {
    console.error("API /api/guess Error:", error);
    return NextResponse.json({ error: "Памылка сервера" }, { status: 500 });
  }
}
