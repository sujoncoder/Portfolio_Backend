import { model, Schema } from "mongoose";
import type { ISkill } from "./skill.interface";


// SKILL SCHEMA
const SkillSchema = new Schema<ISkill>({
    title: { type: String, required: true },
    category: { type: String, required: true, enum: ["programming", "web", "tools"] },
    icon: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
},
    { timestamps: true }
);

export const Skill = model<ISkill>("Skill", SkillSchema);

export default Skill;