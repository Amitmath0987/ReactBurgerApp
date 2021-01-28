import React,{Component} from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    render(){
        const ingredients =Object.keys(this.props.ingredients)
        .map(igKey => {
            return(
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            )
        })
        return(
            <Aux>
            <h1>Your Order</h1>
            <p>A delecious burger with following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p style={{textAlign: 'center',fontSize: '1rem'}}><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
            <p>Continue to purchase?</p>
            <Button btnType={'Danger'} 
            clicked={this.props.purchaseCancel}>CANCEL</Button>
            <Button btnType={'Success'}
            clicked={this.props.purchasecontinue}>CONTINUE</Button>
        </Aux>
        
    );
    }
}
export default OrderSummary;
