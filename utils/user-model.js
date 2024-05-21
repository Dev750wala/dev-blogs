import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            minlength: 3,
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        googleId: {
            type: String,
            // default: 'none',
        },
        githubId: {
            type: Number,
            // default: 0,
        },
        oAuthProvider: {
            type: String,
        },
        password: {
            type: String,
            required: true,
            default: process.env.DEF_PW,
        },
        total_blogs: {
            type: Number,
            required: true,
            default: 0,
        },
        total_likes: {
            type: Number,
            required: true,
            default: 0,
        },
        total_comments: {
            type: Number,
            required: true,
            default: 0,
        },
        total_blog_views: {
            type: Number,
            required: true,
            default: 0,
        }
    }, { timestamps: true }
)

const USER =  mongoose.models.user || mongoose.model('user', userSchema);

export default USER;