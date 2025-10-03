import type { Types } from "mongoose";

export enum BLOG_CATEGORIES {
    WEB_DEVELOPMENT = "web development",
    PROGRAMMING = "programming",
    TUTORIAL = "tutorial",
    TECH_TOOLS = "tech & tools",
    PERSONAL = "personal",
    FITNESS = "fitness"
};

export enum BLOG_STATUS {
    DRAFT = "draft",
    PUBLISHED = "published"
};

export interface IBlog {
    title: string;
    slug: string;
    content: string;
    summary: string;
    featuredImage: string;
    category: BLOG_CATEGORIES;
    status: BLOG_STATUS;
    publishedDate?: Date;
    readTime: number;
    views?: number;
    author?: Types.ObjectId;
};