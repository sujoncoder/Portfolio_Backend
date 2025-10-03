import { model, Schema } from "mongoose";
import { SKILL_CATEGORY, type ISkill } from "./skill.interface";


// SKILL SCHEMA
const SkillSchema = new Schema<ISkill>({
    title: { type: String, required: true },
    category: {
        type: String, required: true, enum: {
            values: Object.values(SKILL_CATEGORY),
            message: "{VALUE} is not a valid category"
        }
    },
    icon: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
},
    { timestamps: true }
);

export const Skill = model<ISkill>("Skill", SkillSchema);

export default Skill;