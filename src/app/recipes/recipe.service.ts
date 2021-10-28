import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../_models/ingredient";
import { ShoppingListService } from "../_services/shopping-list.service";
import { Recipe } from "./recipe";

@Injectable({
    providedIn: 'root'
})

export class RecipeService {    
    recipesChanged = new Subject<Recipe[]>();

    //     new Recipe('Pizza', 
    //     'Pizza is love, pizza is life', 
    //     'https://www.benvenutolimos.com/blog/wp-content/uploads/2017/12/32132764_xl.jpg',
    //     [
    //         new Ingredient('Dough', 1),
    //         new Ingredient('Tomatoes', 2),
    //         new Ingredient('Homemade Ketchup', 100),
    //         new Ingredient('Cheese', 120),
    //         new Ingredient('Chicken breast', 10),
    //         new Ingredient('Champignon', 10),
    //         new Ingredient('Basil', 2)
    //     ]),
    // ];

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

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

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
}