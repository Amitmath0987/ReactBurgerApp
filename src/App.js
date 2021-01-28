import React,{Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Redirect, Route,Switch} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as action from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
});
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
});
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
});
class App extends Component{
  componentDidMount(){
    this.props.onAutoAuthLogin();
  }
  render() {
    let redirectroutes = (
      <Switch>
      <Route path='/Auth' component={asyncAuth} />
      <Route path='/' exact component={BurgerBuilder}/>
      <Redirect to={'/'} />
      </Switch>
    );

    if(this.props.isAuthenticate){
      redirectroutes = (
        <Switch>
            <Route path='/checkout'  component={asyncCheckout}/>
            <Route path='/orders'  component={asyncOrders}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/Auth' component={asyncAuth} />
            <Route path='/' exact component={BurgerBuilder}/>
            <Redirect to='/' />
        </Switch>
      )
    }
    return(
      <div>
        <Layout>
          {redirectroutes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state=>{
  return{
    isAuthenticate: state.authReducer.tokenId !== null
  }
}
const mapDispatchToProps = dispatch=>{
  return{
    onAutoAuthLogin: () => dispatch(action.authCheckstate())
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (App);
