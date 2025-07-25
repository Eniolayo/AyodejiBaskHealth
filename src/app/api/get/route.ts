import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch("https://dashboard-api-dusky.vercel.app/api/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("Authorization") || "",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Unknown error" },
      { status: 500 }
    );
  }
}
