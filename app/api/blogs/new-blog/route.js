import { NextResponse } from "next/server";
import BLOG from "@/utils/blog-model";
import { getServerSession } from 'next-auth';
import { options } from "../../auth/[...nextauth]/option";
import USER from "@/utils/user-model";
import { dbConnect, dbDisconnect } from "@/utils/connnectionToDb";
import { nanoid } from "nanoid";

export async function POST(request) {
    try {
        await dbConnect();
        const { title, content, categories } = await request.json();
        const session = await getServerSession(options);

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userEmail = session.user.email;

        const user = await USER.findOneAndUpdate(
            { email: userEmail },
            {
                $inc: { totalBlogs: 1 },
            },
            { new: true }
        );

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const newBlog = await BLOG.create({
            blog_id: nanoid(15),
            title: title,
            blog: content,
            category: categories,
            author: user._id,
        });

        return NextResponse.json(newBlog, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        dbDisconnect();
    }
}
