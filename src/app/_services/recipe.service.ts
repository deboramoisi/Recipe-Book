import { Injectable } from "@angular/core";
import { Ingredient } from "../_models/ingredient";
import { Recipe } from "../_models/recipe";
import { ShoppingListService } from "./shopping-list.service";

@Injectable({
    providedIn: 'root'
})

export class RecipeService {    
    
    private recipes: Recipe[] = [
        new Recipe('Big Fat Burger', 
        'What else you need to say?', 
        'https://www.usa-beef.org/wp-content/uploads/2021/01/Double-Decker-U.S.-Beef-Burger-scaled.jpg',
        [
            new Ingredient('Burger bun', 1),
            new Ingredient('Meat', 1),
            new Ingredient('Onion', 1),
            new Ingredient('Tomatoes', 2),
            new Ingredient('Sauce', 50),
            new Ingredient('Lettuce', 4),
            new Ingredient('French Fries', 30)
        ]),
        new Recipe('Pizza', 
        'Pizza is love, pizza is life', 
        'https://www.benvenutolimos.com/blog/wp-content/uploads/2017/12/32132764_xl.jpg',
        [
            new Ingredient('Dough', 1),
            new Ingredient('Tomatoes', 2),
            new Ingredient('Homemade Ketchup', 100),
            new Ingredient('Cheese', 120),
            new Ingredient('Chicken breast', 10),
            new Ingredient('Champignon', 10),
            new Ingredient('Basil', 2)
        ]),
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes(): Recipe[] {
        // return a new array so we can't access the recipes stored here
        return this.recipes.slice();
    }

    addIngredientsToSList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(id: number): Recipe {
        return this.recipes[id];
    }
}