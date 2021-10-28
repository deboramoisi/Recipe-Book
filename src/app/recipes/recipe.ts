import { Ingredient } from "../_models/ingredient";

export class Recipe {
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[];

    constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}