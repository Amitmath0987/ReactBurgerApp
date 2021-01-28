import * as actionType from '../actions/actionTypes';
import {updatedObjects} from '../../shared/utility'
// import {initIngredients} from '../actions/index'
;const initialstate = {
    ingredients: null,
    totalPrice: 5,
    error: false,
    building: false
}

const reducer =(state=initialstate,action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            const updatedIngredient = {
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            };
            const updatedIngredients = updatedObjects(state.ingredients,updatedIngredient);
            const updatedstate = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + action.price,
                building: true
            }
            return updatedObjects(state,updatedstate);
            
          case actionType.REM_INGREDIENT:
            const updatedIng = {
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            };
            const updatedIngs = updatedObjects(state.ingredients,updatedIng);
            const updatedst = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - action.price,
                building: true
            }
            return updatedObjects(state,updatedst);
            case actionType.INIT_INGREDIENTS:
                return{
                    ...state,
                    ingredients:action.ingredients,
                    totalPrice: initialstate.totalPrice,
                    building:false
                }
            case actionType.SET_ERROR:
                
                return updatedObjects(state, {error: true})
            default:
                return state;
    }
}

export default reducer;