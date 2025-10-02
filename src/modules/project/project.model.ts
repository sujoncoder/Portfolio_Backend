import { model, Schema } from "mongoose";
import type { IProject } from "./project.interface";


// PROJECT SCHEMA
const projectSchema = new Schema<IProject>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        lowercase: true,
        enum: ['frontend', 'fullstack']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    technologies: {
        type: [String],
        required: [true, 'Technologies are required'],
        validate: {
            validator: (v: string[]) => v.length > 0,
            message: 'At least one technology is required'
        }
    },
    liveUrl: {
        type: String,
        required: [true, 'Live URL is required']
    },
    codeUrl: {
        type: String,
        required: [true, 'Code URL is required']
    }
}, {
    timestamps: true
});

const Project = model<IProject>('Project', projectSchema);

export default Project;