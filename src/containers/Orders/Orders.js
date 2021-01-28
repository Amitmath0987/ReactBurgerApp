import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import classes from './Orders.module.css';
import axios from '../../axios-orders';
import WithError from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';
class Orders extends Component{
    componentDidMount(){
        this.props.onFetchOrderStart(this.props.token,this.props.userId);
        // axios.get('/orders.json')
        // .then(res => {
        //     const fetchedOrder = [];
        //     for(let key in res.data){
        //         fetchedOrder.push({
        //             ...res.data[key],
        //             id: key
        //         });
        //     }
        //     this.setState({orders: fetchedOrder,loading: false})   
        //     console.log(fetchedOrder);         
        // })
        // .catch(err => {
        //     this.setState({loading: false});
            
        // })
    }
    render(){
        let orders = <Spinner />
            
        if(!this.props.loading){
            orders = this.props.orders.map((order) => (
                <Order 
                key={order.id} 
                ingredients={order.ingredients}
                customerName={order.orderData.name}
                email={order.orderData.email}
                street={order.orderData.street}
                price={+ order.price}
                />
             ))
        }
        
        return (
            <div className={classes.Orders}> 
                {orders}
            </div>
    
    )
            
    }
}
const mapStateToProps = state => {
    return{
        orders: state.fetchedOrderReducer.orders,
        loading: state.fetchedOrderReducer.loading,
        token: state.authReducer.tokenId,
        userId: state.authReducer.userId
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onFetchOrderStart: (token,userId) => dispatch(action.fetchOrderStart(token,userId)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps,) (WithError(Orders,axios));