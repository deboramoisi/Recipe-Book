import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Recipe } from "../_models/recipe";
import { RecipeService } from "./recipe.service";
import { map, tap } from 'rxjs/operators';
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root"
})

export class DataStorageService {
    baseUrl: string = environment.apiUrl;

    constructor(private http: HttpClient, private authService: AuthService, private recipesService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.http.put(this.baseUrl + "recipes.json", recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(
              this.baseUrl + "recipes.json"
            ).pipe(
              map(recipes => {
                return recipes.map(recipe => {
                  return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                  };
                });
              }),
              tap(recipes => {
                this.recipesService.setRecipes(recipes);
              })
            );
    }

}