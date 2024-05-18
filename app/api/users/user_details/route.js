import USER from "@/utils/user-model";
import { dbConnect, dbDisconnect } from "@/utils/connnectionToDb";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/option";
import { NextResponse } from "next/server";

// TODO pending whole POST request

export async function POST(request) {
    await dbConnect();
    const { name } = await request.json();

    if (name === "@me") {
        
    }
    const session = await getServerSession(options);
    const userEmail = session.user.email;

    try {
        const user = await USER.findOne({ email: userEmail });

        return NextResponse.json(user);
    
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);

    } finally {
        dbDisconnect();
    }
}