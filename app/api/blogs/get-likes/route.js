import { dbConnect, dbDisconnect } from "@/utils/connnectionToDb";
import USER from "@/utils/user-model";
import { NextResponse } from "next/server";

export async function POST(request) {
    await dbConnect();
    const { likes } = await request.json();
    
    console.log("Hello world!");
    console.log(likes);
    var final_response = [];

    try {
        likes.map(async (user_id) => {
            const user = await USER.findById(user_id.liker);
            final_response.push(user);
        })

        return NextResponse.json(final_response, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 500 })
    }
}