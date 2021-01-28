import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom';
const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>;
        });
    })
    // allows us to tranform an array into something else.it takes function as input which receives to args:prevValue,curValue
    .reduce((arr, el) => {
         return arr.concat(el)

    },[])
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please Start adding Ingredient!</p>
    }
    
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>

        </div>
    );
};

export default withRouter(burger);