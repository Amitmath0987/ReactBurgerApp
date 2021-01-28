import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label:'Salad', type: 'salad'},
    {label:'Cheese', type: 'cheese'},
    {label:'Meat', type: 'meat'},
    {label:'Bacon', type: 'bacon'}
];
const buildControls =(props) => (
    <div className={classes.BuildControls}>
    <p>currrent price: $<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((ctrl) => (
            <BuildControl 
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
             removed={() => props.ingredientRemove(ctrl.type)}disabled={props.disabled[ctrl.type]}
             purchasable={props.purchasable}/>
            ))}
            <button className={classes.OrderButton} disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth?'ORDER NOW': 'SIGNUP TO CONTINUE'}</button>
    </div>

);
export default buildControls;