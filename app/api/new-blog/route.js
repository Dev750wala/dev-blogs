import { NextResponse } from "next/server";
import BLOG from "@/utils/blog-model";
import { getServerSession } from 'next-auth';
import { options } from "../auth/[...nextauth]/option";
import USER from "@/utils/user-model";
import { dbConnect, dbDisconnect } from "@/utils/connnectionToDb";
import { nanoid } from "nanoid";

export async function POST(request) {
    await dbConnect();
    const { title, content, categories } = await request.json();
    const session = await getServerSession(options);

    const userEmail = session.user.email;

    try {
        const user = await USER.findOne({ email: userEmail });

        const newBlog = await BLOG.create({
            blog_id: nanoid(15),
            title: title,
            blog: content,
            category: categories,
            author: user._id,
        });
        
        return NextResponse.json(newBlog);

    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    } finally {
        dbDisconnect();
    }
}

