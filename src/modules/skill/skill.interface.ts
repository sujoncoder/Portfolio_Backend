type Category = "programming" | "web" | "tools"

export interface ISkill {
    title: string;
    category: Category;
    icon: string;
    rating: number;
};