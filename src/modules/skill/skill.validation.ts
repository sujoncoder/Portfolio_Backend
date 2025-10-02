import { z } from "zod";


// CATEGORY ZOD SCHEMA
const categorySchema = z.enum(["programming", "web", "tools"], {
    error: "Category must be one of: 'programming', 'web', or 'tools'",
});


// SKILL ZOD SCHEMA
export const skillValidationSchema = z.object({
    title: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Title is required"
                : issue.code === "invalid_type"
                    ? "Title must be a string"
                    : undefined,
    })
        .min(3, { error: "Title must be at least 3 characters long" })
        .max(30, { error: "Title cannot exceed 30 characters" })
        .trim(),

    category: categorySchema,

    icon: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "icon URL is required"
                : issue.code === "invalid_type"
                    ? "Icon must be a string"
                    : undefined,
    }),

    rating: z.number({
        error: (issue) =>
            issue.input === undefined
                ? "Rating is required"
                : issue.code === "invalid_type"
                    ? "Rating must be a number"
                    : undefined,
    })
        .min(1, { error: "Rating must be at least 1" })
        .max(5, { error: "Rating cannot be greater than 5" }),
});



// UPDATE SKILL ZOD SCHEMA
export const updateSkillValidationSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters long")
        .max(30, "Title cannot exceed 30 characters")
        .trim()
        .optional(),

    category: categorySchema.optional(),

    image: z
        .string()
        .trim()
        .optional(),

    rating: z
        .number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot be greater than 5")
        .optional()
});