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
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { bestRank, usedRanks = [], sessionId, dayIndex } = body;

    if (typeof bestRank !== "number" || bestRank < 1) {
      return NextResponse.json(
        { error: "Няправільны параметр bestRank" },
        { status: 400 },
      );
    }

    if (!Array.isArray(usedRanks)) {
      return NextResponse.json(
        { error: "Няправільны параметр usedRanks" },
        { status: 400 },
      );
    }

    // Validate dayIndex parameter
    const currentDayIndex = gameService.getDailySecret().dayIndex;
    if (!validateDayIndex(dayIndex, currentDayIndex)) {
      return NextResponse.json({ error: "Invalid dayIndex" }, { status: 400 });
    }

    usedRanks.push(1); // never reveal the first rank

    // 1. Пачатковая мэта - палова найлепшага рангу
    let targetRank = Math.ceil(bestRank / 2);
    if (targetRank < 1) targetRank = 1;

    // 2. Калі гэты ранг ужо адкрыты, шукаем найбліжэйшы неадкрыты (ідзем павелічэннем нумара)
    // Гэта дазваляе атрымаць словы 3, 4, 5..., калі 2 ужо ёсць.
    while (usedRanks.includes(targetRank)) {
      targetRank++;

      // Бяспека: не выходзім за межы разумнага
      if (targetRank > 100000) break;
    }

    const word = gameService.getWordByRank(targetRank, dayIndex);

    if (!word) {
      console.error("Failed to get word for rank:", targetRank);
      return NextResponse.json(
        { error: "Не ўдалося знайсці падказку" },
        { status: 500 },
      );
    }

    // Return the dayIndex that was used (provided or current)
    const responseDayIndex = dayIndex ?? gameService.getDailySecret().dayIndex;

    return NextResponse.json({
      word,
      rank: targetRank,
      dayIndex: responseDayIndex,
    });
  } catch (error) {
    console.error("API /api/hint Error:", error);
    return NextResponse.json({ error: "Памылка сервера" }, { status: 500 });
  }
}
