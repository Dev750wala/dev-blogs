import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json();

    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
