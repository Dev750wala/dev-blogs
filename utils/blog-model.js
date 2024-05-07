import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        brief: {
            type: String,
            required: true
        },
        blog: {
            type: String,
            required: true
        },
        category: {
            type: [String],
            // required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    }, { timestamps: true },
);

const BLOG =  mongoose.models.blog || mongoose.model('blog', blogSchema);

export default BLOG;