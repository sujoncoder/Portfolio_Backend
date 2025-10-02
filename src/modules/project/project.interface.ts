type ICategory = "frontend" | "fullstack";

export interface IProject {
    title: string;
    category: ICategory;
    description: string;
    image: string;
    technologies: string[];
    liveUrl: string;
    codeUrl: string
};