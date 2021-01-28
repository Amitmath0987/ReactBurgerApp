import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const fetchOrder = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return{
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
};
export const fetchOrderStart = (token,userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(res => {
            const fetchedOrder = [];
            for(let key in res.data){
                fetchedOrder.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrder(fetchedOrder))       
        })
        .catch(err => {
            dispatch(fetchOrdersFail(err));
        })
    }
}