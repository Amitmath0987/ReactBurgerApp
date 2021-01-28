import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as action from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from'react-router-dom';
class Auth extends Component {

    componentDidMount(){
        
        if(!this.props.burgerBuilding && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }
    state={
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }

    checkValidity(value,rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength ) {
            isValid = value.length >= rules.minLength  && isValid;
        }
        
        if(rules.isEmail){
            const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangedHandler =(event,controlName) => {
        let updatedAuthForm = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedAuthForm})
    }
        
     submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
    }

    SwitchAuthHandler =() => {
        this.setState(prevState => {
            return{
                isSignUp: !prevState.isSignUp
            }     
        })

    }
    render(){
        let FormInputArray = [];
        for (let key in this.state.controls){
            FormInputArray.push(
                {
                    id: key,
                    Config: this.state.controls[key]
                }
            );
        }

        let form =(
            
            FormInputArray.map((FormElement) => (
                <Input 
                    key={FormElement.id}
                    elementType={FormElement.Config.elementType} elementConfig={FormElement.Config.elementConfig} 
                    value={FormElement.Config.value}
                    changed={(event) => this.inputChangedHandler(event,FormElement.id)}
                    valid={!FormElement.Config.valid}
                    shouldValid={FormElement.Config.validation}
                    touched={FormElement.Config.touched}
                />
            ))
        )
        if(this.props.loading){
            form= <Spinner />
        }
        let errorMessage = null
        if(this.props.error){
           errorMessage = (
            <p style={{color:'red'}}>{this.props.error}</p>
           )
        }
        let successMessage = null
        if(this.props.successMessage){
            successMessage = (
                <p  style={{color:'green'}}>{this.props.successMessage}</p>
            )
            
        }
        let authRedirect = null;
        if(this.props.isAuth){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return(
            <div className={classes.SignIn}>
            {authRedirect}
            <h3 style={{color: '#966909'}}>{this.state.isSignUp ? 'Create your account!': 'Login to your account' }</h3>
            <form onSubmit={this.submitHandler}>
             {/*show error message */}
            {errorMessage}
            {/*show success message */}
            {successMessage}
            {form}
            <Button btnType='Success'>SUBMIT</Button>
            </form>
            <Button btnType={'Danger'} clicked={this.SwitchAuthHandler}>Switch to {this.state.isSignUp  ? 'SignIn' : 'SignUp'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        error: state.authReducer.error,
        loading: state.authReducer.loading,
        successMessage: state.authReducer.successMessage,
        isAuth: state.authReducer.tokenId !== null,
        burgerBuilding: state.burgerReducer.building,
        authRedirectPath: state.authReducer.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return{
        // onIngredientAdded: (igName) => dispatch(actions.addIngredients(igName,INGREDIENTS_PRICE[igName])),
        onAuth: (email,password,isSignUp) => dispatch(action.auth(email,password,isSignUp)),
        onSetAuthRedirectPath: () => dispatch(action.setauthRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Auth);