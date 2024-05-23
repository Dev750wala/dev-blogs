"use server"
import USER from "@/utils/user-model";
import BLOG from "@/utils/blog-model";
import { dbConnect, dbDisconnect } from "@/utils/connnectionToDb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/option";

export async function POST(request) {
    await dbConnect();
    const session_demo = await getServerSession(options);
    console.log(`DEVDEVDEVDEVDEVDEVDEVDEV${session_demo}`);

    const { blog_id, session } = await request.json();

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
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        dbDisconnect();
    }
}
