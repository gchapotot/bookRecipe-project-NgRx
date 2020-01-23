import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromRecipes from '../recipes/store/recipe.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
    recipes: fromRecipes.State
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
};

export const appReducer: ActionReducerMap<AppState> = {
    recipes: fromRecipes.recipeReducer,
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
};