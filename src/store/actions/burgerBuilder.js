import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setIngredients = (ingredients) => {
    return{
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ingredients
    }
}
export const setError = (error) =>{
    return{
        type: actionTypes.SET_ERROR,
        error: error
    }
}
export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-64624.firebaseio.com/ingredients.json')
    .then(response => {
        // console.log(response);
        dispatch(setIngredients(response.data));
    })
    .catch(error => {
        dispatch(setError(error))
        // console.log(error);
    });
    }
}

export const addIngredients = (igName,price) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: igName ,
        price:price

    }
}
export const remIngredients = (igName,price) => {
    return{
        type: actionTypes.REM_INGREDIENT,
        ingredientName: igName,
        price:price

    }
}