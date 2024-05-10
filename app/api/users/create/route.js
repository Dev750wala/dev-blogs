import { createJwtToken } from "@/utils/jwt-token-create";
import USER from "@/utils/user-model";
import { NextResponse } from "next/server";
import { dbConnect, dbDisconnect } from "@/utils/connnectionToDb";

export async function POST(request, response) {
    const data = await request.json();

    const errors = {
        username: "",
        email: "",
    }
    // console.log(`${uri} !!!!!!!!!!!!!!!!!devdevdevdev`);
    dbConnect();
    try {
        const user = await USER.findOne({ email: data.email });
        if (user) {
            errors.email = "Email already exists";
            return NextResponse.json({errors});
        }
        const userWithSameUsername = await USER.findOne({
            username: data.username,
        });
        if(userWithSameUsername) {
            errors.username = "oops! username is already taken...";
            return NextResponse.json({errors});
        }
        const newUser = await USER.create({
            username: data.username,
            email: data.email,
            password: data.password,
        });
        const token = createJwtToken(newUser._id);
        
        dbDisconnect();

        const cookieOptions = {
            httpOnly: true,
            path: '/',
            maxAge: 3600,
        };
        // response.setHeader("Set-Cookie", `jwt=${token}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`);
        const newUserAndToken = {
            message: "User created successfully",
            user: newUser,
            token: token,
        }
        
        return NextResponse.json({newUserAndToken});

    } catch (error) {
        console.error(error);
        return NextResponse.error(new Error("Failed to create user"));
    }
}
