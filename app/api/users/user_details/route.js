import USER from "@/utils/user-model";
import { dbConnect, dbDisconnect } from "@/utils/connnectionToDb";
import { NextResponse } from "next/server";
import BLOG from "@/utils/blog-model";

export async function POST(request) {
    await dbConnect();
    const {username, session} = await request.json();
    // console.log(name);

    try {
        if (username === "@me") {
            console.log(`jo bhai aa session: ${session}`);
            if (session) {
                const userEmail = session.user.email;
                const user = await USER.findOne({ email: userEmail });
                const blogs = await BLOG.find({ author: user._id })

                // console.log(blogs);

                return NextResponse.json({
                    user: user,
                    blogs: blogs,
                });
            } else {
                return NextResponse.json({ error: "No session found" });
            }
        } else {
            const user = await USER.findOne({ username: username });
            const blogs = await BLOG.find({ author: user._id })

            // console.log(blogs);

            return NextResponse.json({
                user: user,
                blogs: blogs,
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "User not found" });
    } 
    finally {
        dbDisconnect();
    }
}
