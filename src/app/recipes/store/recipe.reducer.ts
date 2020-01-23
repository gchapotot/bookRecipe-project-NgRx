import { Recipe } from '../recipe.module';

import * as RecipesActions from './recipe.actions';

export interface State {
    recipes: Recipe[];
}

const initialeState: State = {
    recipes: []
}

export function recipeReducer(
    state = initialeState,
    action: RecipesActions.RecipesActions
) {
    switch (action.type) { 
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }
        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case RecipesActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.recipe
            };
            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: updatedRecipes
            };
        case RecipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, recipeIndex) => {
                    return recipeIndex !== action.payload;
                })
            }
        default:
            return state;
    }
}