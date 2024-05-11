import { createJwtToken } from "@/utils/jwt-token-create";
import USER from "@/utils/user-model";
import { NextResponse } from "next/server";
import { dbConnect, dbDisconnect } from "@/utils/connnectionToDb";
import { headers } from "next/headers";

export async function POST(request, response) {
    await dbConnect();
    const data = await request.json();

    const errors = {
        username: "",
        email: "",
    }
    // console.log(`${uri} !!!!!!!!!!!!!!!!!devdevdevdev`);
    
    try {
        const user = await USER.findOne({ email: data.email });
        if (user) {
            errors.email = "Email already in use. Please choose another.";
            return NextResponse.json({errors});
        }
        const userWithSameUsername = await USER.findOne({
            username: data.username,
        });
        if(userWithSameUsername) {
            errors.username = "Username is already taken. Please choose another.";
            return NextResponse.json({errors});
        }
        const newUser = await USER.create({
            username: data.username,
            email: data.email,
            password: data.password,
        });
        const token = createJwtToken(newUser._id);

        const cookieOptions = {
            httpOnly: true,
            path: '/',
            maxAge: 360000000,
        };
        // response.setHeader("Set-Cookie", `jwt=${token}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`);
        const newUserAndToken = {
            message: "User created successfully",
            user: newUser,
            token: token,
        }
        
        return NextResponse.json({
            newUserAndToken,
            headers: {
                "Set-Cookie": [
                    `jwt=${token}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`,
                ],
                "Content-Type": "application/json",
            }
        });

    } catch (error) {
        console.error(error);
        return NextResponse.error(new Error("Failed to create user"));
    } finally {
        dbDisconnect();
    }
}
