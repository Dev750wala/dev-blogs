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

    try {
        const liker = await USER.findOne({ email: session.user.email });

        const blog = await BLOG.findOneAndUpdate(
            { blog_id: data.blog_id },
            { $push: { likes: { liker: liker._id } } },
        );

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        const author = await USER.findByIdAndUpdate(data.author,
            { $inc: { total_likes: 1 } },
            { new: true }
        )
        return NextResponse.json({status: 200,})

    } catch (error) {
        console.log(error);
        return NextResponse.json({error, status: error.status});
    }
}