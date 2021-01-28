import React from 'react';

import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.module.css';
import Button from '../../UI/Button/Button';
const checkoutSummary = props => {
    return(
        <div className={classes.checkoutSummary}>
            <h1>we hope you like the taste!...</h1>

            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType='Danger'
            clicked={props.checkoutCancel}>CANCEL</Button>
            <Button btnType='Success'
            clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;