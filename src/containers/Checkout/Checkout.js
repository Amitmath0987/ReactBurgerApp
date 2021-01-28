import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux'
class Checkout extends Component{
    
// componentDidMount(){
//     const query = new URLSearchParams(this.props.location.search);
//     const ingredients = {};
//     let Price = 0;
//     for(let param of query.entries()){
//         // ['cheese','1'];
        
//         if(param[0] === 'Price'){
//             Price = param[1];
//         }
//         else{
//             ingredients[param[0]] = +param[1];
//         }
       
//     }
//     this.setState({
//         ingredients: ingredients,
//         totalPrice: Price});
// }
    
    checkoutCancel = () =>{
        this.props.history.goBack();
    }

    checkoutContinue = () =>{
        this.props.history.replace('/checkout/contact-data-form');
    }
    
    render(){
        let summary = <Redirect to='/' />
        const  purchasedInit = this.props.purchased ? <Redirect to='/'/> : null
        if(this.props.ingredients){
            
            summary = <React.Fragment>
            {purchasedInit}
            <CheckoutSummary 
            ingredients={this.props.ingredients} 
            checkoutCancel={this.checkoutCancel}
            checkoutContinue={this.checkoutContinue}
            />
            <Route path={this.props.match.url +'/contact-data-form'} component={ContactData} />
        </React.Fragment>
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.burgerReducer.ingredients,
        purchased: state.orderReducer.purchased
    }
}
export default connect(mapStateToProps) (Checkout);