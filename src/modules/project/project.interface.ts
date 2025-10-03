export enum PROJECT_CATEGORY {
    FRONTEND = "frontend",
    FULLSTACK = "fullstack"
};

export interface IProject {
    title: string;
    category: PROJECT_CATEGORY;
    description: string;
    image: string;
    technologies: string[];
    liveUrl: string;
    codeUrl: string
};