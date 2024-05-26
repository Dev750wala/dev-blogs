import { NextResponse } from 'next/server';
import { dbConnect, dbDisconnect } from '@/utils/connnectionToDb';
// import BLOG from '@/utils/blog-model';
import USER from '@/utils/user-model';

export async function POST(request) {
    await dbConnect();
    const data = await request.json();

    const comments = data.comments;

    try {
        const updatedComments = await Promise.all(comments.map(async (comment) => {
            const user = await USER.findById(comment.commenter);
            if (user) {
                return {
                    ...comment,
                    name: user.name,
                    username: user.username,
                };
            } else {
                throw new Error(`User with ID ${comment.commenter} not found`);
            }
        }));

        return NextResponse.json({ comments: updatedComments });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message });
    }
}
