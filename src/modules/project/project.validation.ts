import { z } from "zod";


// CATEGORY ZOD SCHEMA
const categorySchema = z.enum(["programming", "web", "tools"], {
    error: "Category must be either 'programming' or 'web' or 'tools'",
});


// PROJECT ZOD SCHEMA
export const projectValidationSchema = z.object({
    title: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Title is required"
                : issue.code === "invalid_type"
                    ? "Title must be a string"
                    : undefined,
    })
        .min(2, { error: "Title must be at least 2 characters long" })
        .max(30, { error: "Title cannot exceed 30 characters" })
        .trim(),

    category: categorySchema,

    description: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Description is required"
                : issue.code === "invalid_type"
                    ? "Description must be a string"
                    : undefined,
    })
        .min(10, { error: "Description must be at least 10 characters long" })
        .max(1000, { error: "Description cannot exceed 1000 characters" })
        .trim(),

    image: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Image URL is required"
                : issue.code === "invalid_type"
                    ? "Image must be a string"
                    : undefined,
    })
        .url({ error: "Image must be a valid URL" })
        .trim(),

    technologies: z.array(
        z.string().min(1, { error: "Technology name cannot be empty" }).trim(),
        {
            error: (issue) =>
                issue.input === undefined
                    ? "Technologies array is required"
                    : issue.code === "invalid_type"
                        ? "Technologies must be an array of strings"
                        : undefined,
        }
    )
        .min(1, { error: "At least one technology is required" })
        .max(20, { error: "Cannot add more than 20 technologies" }),

    liveUrl: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Live URL is required"
                : issue.code === "invalid_type"
                    ? "Live URL must be a string"
                    : undefined,
    })
        .url({ error: "Live URL must be a valid URL" })
        .trim(),

    codeUrl: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Code URL is required"
                : issue.code === "invalid_type"
                    ? "Code URL must be a string"
                    : undefined,
    })
        .url({ error: "Code URL must be a valid URL" })
        .trim(),
});


// PROJECT UPDATE ZOD SCHEMA
export const updateProjectValidationSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title cannot exceed 100 characters")
        .trim()
        .optional(),

    category: categorySchema.optional(),

    description: z
        .string()
        .min(10, "Description must be at least 10 characters long")
        .max(1000, "Description cannot exceed 1000 characters")
        .trim()
        .optional(),

    image: z
        .string()
        .url("Image must be a valid URL")
        .trim()
        .optional(),

    technologies: z
        .array(z.string().min(1).trim())
        .min(1, "At least one technology is required")
        .max(20, "Cannot add more than 20 technologies")
        .optional(),

    liveUrl: z
        .string()
        .url("Live URL must be a valid URL")
        .trim()
        .optional(),

    codeUrl: z
        .string()
        .url("Code URL must be a valid URL")
        .trim()
        .optional()
});

// Type inference
export type TProjectValidation = z.infer<typeof projectValidationSchema>
export type TUpdateProjectValidation = z.infer<typeof updateProjectValidationSchema>