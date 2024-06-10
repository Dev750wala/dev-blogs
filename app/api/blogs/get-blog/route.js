import USER from "@/utils/user-model";
import BLOG from "@/utils/blog-model";
import { dbConnect, dbDisconnect } from "@/utils/connnectionToDb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/option";

export async function POST(request) {

    try {
        await dbConnect(); 
        const body = await request.json();
        console.log("Request body:", body);

        const session = await getServerSession({ req: request, ...options });
        console.log(`Session info: ${JSON.stringify(session)}`);

        const { blog_id } = body;

        let user;
        if (session) {
            user = await USER.findOne({ email: session.user.email });
        }

        const blog = await BLOG.findOne({ blog_id: blog_id });
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

        const likes = blog.likes;
        const likedTheBlog = likes.find((like) => like.liker.toString() === user._id.toString());

        return NextResponse.json({ 
            blog: blog, 
            author: author,
            liked: likedTheBlog ? true : false,
        });

    } catch (error) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } 
    // finally {
    //     await dbDisconnect();
    // }
}
