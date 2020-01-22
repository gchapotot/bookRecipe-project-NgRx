import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.module';
import { Ingredient } from '../shared/ingredients.model';

import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {
    recipesListChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];

    constructor(
        private store: Store<fromApp.AppState>
    ) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesListChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients : Ingredient[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients) );
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesListChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesListChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesListChanged.next(this.recipes.slice());
    }
}