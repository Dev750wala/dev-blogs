"use server"
import USER from "@/utils/user-model";
import BLOG from "@/utils/blog-model";
import { dbConnect, dbDisconnect } from "@/utils/connnectionToDb"; 
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/option";

export async function POST(request) {
    await dbConnect();

    // Log the entire request object for debugging
    console.log("Request object:", request);

    // Read and parse the request body
    const body = await request.json();

    // Log the parsed request body
    console.log("Request body:", body);

    // Correct session fetching from the request
    const session_demo = await getServerSession({ req: request, ...options });
    console.log(`Session info: ${JSON.stringify(session_demo)}`);

    const { blog_id, session } = body;

    try {
        let user;
        if (session) {
            user = await USER.findOne({
                email: session.user.email,
            });
        }

        const blog = await BLOG.findOne({
            blog_id: blog_id,
        });

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        await BLOG.findOneAndUpdate(
            { blog_id: blog_id },
            { $inc: { views: 1 } }
        );

        const author = await USER.findByIdAndUpdate(
            blog.author,
            { $inc: { total_blog_views: 1 } },
            { new: true }
        );

        return NextResponse.json({
            blog: blog,
            author: author,
        });

    } catch (error) {
        // Log the error for debugging
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        dbDisconnect();
    }
}
