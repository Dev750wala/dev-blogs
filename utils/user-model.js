import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    }, { timestamps: true }
)

const USER =  mongoose.models.user || mongoose.model('user', userSchema);

export default USER;