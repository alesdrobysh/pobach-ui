import { NextResponse } from "next/server";
import { gameService, initializeGameService } from "@/lib/container";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dayIndexStr = searchParams.get("dayIndex");

    if (!dayIndexStr) {
      return NextResponse.json(
        { error: "Патрабуецца dayIndex" },
        { status: 400 },
      );
    }

    const dayIndex = parseInt(dayIndexStr, 10);
    if (Number.isNaN(dayIndex)) {
      return NextResponse.json(
        { error: "Няправільны dayIndex" },
        { status: 400 },
      );
    }

    // Ensure service is initialized
    await initializeGameService();

    // Security: Only allow current day or past days (no peeking into future)
    const currentDayIndex = gameService.getDailySecret().dayIndex;
    if (dayIndex > currentDayIndex) {
      return NextResponse.json(
        { error: "Недапушчальны dayIndex" },
        { status: 403 },
      );
    }

    const topWords = gameService.getTopWords(dayIndex, 100);

    // Cache for 24 hours - top words for a day never change
    return NextResponse.json(topWords, {
      headers: {
        "Cache-Control": "public, s-maxage=86400", // 24 hours
      },
    });
  } catch (error) {
    console.error("API /api/top-words Error:", error);
    return NextResponse.json({ error: "Памылка сервера" }, { status: 500 });
  }
}
