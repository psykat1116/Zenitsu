import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q");
    if (!q) {
      return NextResponse.json(
        { message: "Query Is Required" },
        { status: 400 }
      );
    }

    const res = [];
    const start = performance.now();

    const data = await db.data.findMany({
      where: {
        string: {
          startsWith: q.toUpperCase(),
        },
      },
    });

    const end = performance.now();

    for (const el of data) {
      if (el.string.endsWith("*")) {
        res.push(el.string.substring(0, el.string.length - 1));
      }
    }

    return NextResponse.json({
      results: res,
      duration: end - start,
    });
  } catch (error) {
    console.log("[MONGODB_API_ERROR]", error);
    return NextResponse.json(
      {
        results: [],
        duration: 0,
      },
      { status: 500 }
    );
  }
}
