import * as actionTypes from '../actions/actionTypes';
import{updatedObjects} from '../../shared/utility';
const initialstate = {
    orders:[],
    loading: false,
    purchased: false
}

 const reducer = ( state = initialstate,action) => {

    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
           return updatedObjects(state,{purchased: false})
        case actionTypes.PURCHASE_BURGER_START:
           return updatedObjects(state,{loading: true})
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
           return updatedObjects(state,{orders: state.orders.concat(newOrder),loading:false,purchased: true})
            
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updatedObjects(state,{loading: false})
        default:
            return state;
    }
}
export default reducer