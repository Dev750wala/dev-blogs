import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
        blog_id: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true
        },
        blog: {
            type: String,
            required: true
        },
        category: {
            type: [String],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        comments: [
            {
                commenter: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                },
                comment: {
                    type: String,
                    required: true,
                },
                commentDate: {
                    type: Date,
                    default: Date.now,
                }
            }
        ],
        likes: [
            {
                liker: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                    required: true,
                },
            }
        ],
        views: {
            type: Number,
            required: true,
            default: 0,
        },
        creationDate: {
            type: Date,
            default: Date.now,
        }
    }, { timestamps: true },
);

const BLOG =  mongoose.models.blog || mongoose.model('blog', blogSchema);

export default BLOG;