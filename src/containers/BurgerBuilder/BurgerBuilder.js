import React,{Component} from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';


import * as actions from '../../store/actions/index';
const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

export class BurgerBuilder extends Component{

    state = {
        purchasing: false,
        loading: false,
    }
componentDidMount () {
    this.props.onInitIngredients();
}
    updatePurchaseState (ingredients) {
        
        const sum = Object.keys(ingredients)
        .map(igkey => {
            return ingredients[igkey];
        })
        .reduce((sum,el) => {
            return sum + el;
        },0);
        return sum > 0;
    }
    

    purchaseHandler =() => {
        if(this.props.isAuth){
            this.setState({purchasing: true
            });
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/Auth');
        }
        

    }
    purchaseCancelHandler =() => {
        this.setState({
            purchasing: false
        })
    }
    purchaseContinueHandler =() => {
        this.props.onInitPurchased()
         this.props.history.push('/checkout');
    }
    render(){
        const disabledInfo = {
            ...this.props.ig
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 ;
        }

        let orderSummary = null;
        let burger = this.props.error ?  <p style={{textAlign :'center',color: "brown"}}> Ingredients can't be Loaded!</p> :<Spinner />;
        if(this.props.ig) {
            burger = (
                <Aux>
                <Burger ingredients={this.props.ig}/>
            <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemove}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ig)}
            isAuth={this.props.isAuth}
            ordered={this.purchaseHandler}/>
            </Aux>
            );

            orderSummary = <OrderSummary ingredients={this.props.ig}
            purchaseCancel={this.purchaseCancelHandler}
            purchasecontinue={this.purchaseContinueHandler}
            price={this.props.totalPrice}/>
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }

        
        return(
            <Aux>
            <Modal show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
            </Modal>
            {burger}
            
            </Aux>

        );
    }

}

const mapStateToProps = state => {
    return{
        ig: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice,
        error: state.burgerReducer.error,
        isAuth: state.authReducer.tokenId !== null   
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (igName) => dispatch(actions.addIngredients(igName,INGREDIENTS_PRICE[igName])),
        onIngredientRemove: (igName) => dispatch(actions.remIngredients(igName,INGREDIENTS_PRICE[igName])),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchased: () => dispatch(actions.purchasedInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setauthRedirectPath(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler (BurgerBuilder,axios));