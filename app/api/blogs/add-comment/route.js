import USER from "@/utils/user-model";
import BLOG from "@/utils/blog-model";
import { dbConnect, dbDisconnect } from "@/utils/connnectionToDb";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/option";
import { NextResponse } from "next/server"; 

export async function POST(request) {
    await dbConnect();
    const data = await request.json();
    
    const session = await getServerSession(options);

    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { comment, blog_id } = data;

    try {
        const commenter = await USER.findOne({
            email: session.user.email,
        });

        if (!commenter) {
            throw new Error('User not found');
        }

        const blog = await BLOG.findOneAndUpdate(
            { blog_id: blog_id },
            {
                $push: {
                    comments: {
                        commenter: commenter._id,
                        comment: comment,
                    },
                },
            },
            { new: true } 
        );

        if (!blog) {
            throw new Error('Blog not found');
        }

        const author = await USER.findByIdAndUpdate(
            blog.author,
            { $inc: { total_comments: 1 } },
            { new: true } 
        );

        return NextResponse.json({
            blog: blog,
            author: author,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    } finally {
        await dbDisconnect();
    }
}
