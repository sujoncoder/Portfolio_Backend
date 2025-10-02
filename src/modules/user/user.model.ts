import { Schema, model } from "mongoose";
import type { IUser } from "./user.interface";


// USER SCHEMA
const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;