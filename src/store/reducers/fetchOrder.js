import * as actionTypes from '../actions/actionTypes';
import{updatedObjects} from '../../shared/utility';
const initialstate = { 
    orders:[],
    error: false,
    loading: true
}
const fetchedOrderReducer = (state = initialstate,action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS:
            return updatedObjects(state,{orders:action.orders,loading: false})
        case actionTypes.FETCH_ORDER_FAIL:
            return updatedObjects(state,{error:action.error,loading: false})   
        default:
            return state;
    }
}

export default fetchedOrderReducer