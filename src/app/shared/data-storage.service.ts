import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.module';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.http.put('https://recipe-project-ab499.firebaseio.com/recipes.json', recipes)
            .subscribe(
                responseData => {
                    console.log(responseData);
                }
            )
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://recipe-project-ab499.firebaseio.com/recipes.json').pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                });
            }),
            tap(
                recipes => {
                    this.recipeService.setRecipes(recipes);
                }
            )
        )
    }

}