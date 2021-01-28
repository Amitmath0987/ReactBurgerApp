import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contact.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
// import order from '../../../components/Order/Order';
class ContactData extends Component{

    state= {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            ZipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'Default Delivery method', displayValue: 'choose Delivery Method'},
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'default Delivery',
                validation: {},
                valid:true
            }
        },
        formIsValid: false,
        userId: localStorage.getItem('userId')
    }
    OrderHandler = (event) =>{
        event.preventDefault();
            let formData = {}
            for(let formElementIdentifier in this.state.orderForm){
                formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            }
       let orders = {
            userId: this.props.userId,
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        this.props.onBurgerPurchase(orders,this.props.token)
    }
    checkValidity(value,rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength  && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler =(event,inputIdentifier) => {
        let updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
       
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier
             in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        this.setState({orderForm: updatedOrderForm,formIsValid: formIsValid})
        
    }
    
    render(){
        let FormInputArray = [];
        for (let key in this.state.orderForm){
            FormInputArray.push(
                {
                    id: key,
                    Config: this.state.orderForm[key]
                }
            );
        }
        let form = (
            <form onSubmit={this.OrderHandler}>
                    
                    {FormInputArray.map((inputElement) => (
                        <Input 
                            key={inputElement.id}
                            elementType={inputElement.Config.elementType} elementConfig={inputElement.Config.elementConfig} 
                            value={inputElement.Config.value}
                            changed={(event) => this.inputChangedHandler(event,inputElement.id)}
                            valid={!inputElement.Config.valid}
                            shouldValid={inputElement.Config.validation}
                            touched={inputElement.Config.touched}
                        />
                    ))}
                    <Button btnType='Success'
                    disabled={!this.state.formIsValid} >ORDER</Button>
                </form>
        );
        if(this.props.loading){
            form = < Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h1>Enter your Contact data</h1>
                    {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice,
        loading: state.orderReducer.loading,
        token: state.authReducer.tokenId,
        userId: state.authReducer.userId
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onBurgerPurchase: (orders,token) => dispatch(
            actions.purchaseBurger(orders,token) )
        }
}
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(ContactData,axios));