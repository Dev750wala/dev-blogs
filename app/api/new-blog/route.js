import { NextResponse } from "next/server";
import BLOG from "@/utils/blog-model";
import { getServerSession } from 'next-auth';
import { options } from "../auth/[...nextauth]/option";
import USER from "@/utils/user-model";

export async function POST(request) {
    const { title, description, category } = await request.json();
    const session = await getServerSession(options);
    // console.log(session);

    const userEmail = session.user.email;

    try {
        const user = await USER.findOne({ email: userEmail });

        const newBlog = await BLOG.create({
            title: title,
            blog: description,
            category: category,
            author: user._id,
        })
        
        return NextResponse.json(newBlog);

    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    }
}
