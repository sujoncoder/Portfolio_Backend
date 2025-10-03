export enum SKILL_CATEGORY {
    PROGRAMMING = "programming",
    WEB = "web",
    TOOLS = "tools"
};

export interface ISkill {
    title: string;
    category: SKILL_CATEGORY;
    icon: string;
    rating: number;
};