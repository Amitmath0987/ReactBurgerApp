import * as actionType from '../actions/actionTypes';
import  { updatedObjects } from '../../shared/utility';
const initialState = {
    tokenId: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state,action) => {
    return updatedObjects(state,{loading: true});
}
const authSuccess = (state,action) => {
    return updatedObjects(state,{
        tokenId: action.tokenId,
        userId: action.userId,
        loading:false
    });
}

const authLogout = (state,action) => {
    return updatedObjects(state,{tokenId: null,userId: null,})
}
const authFail = (state,action) => {
    return updatedObjects(state,{error: action.error,loading:false});
}

const setauthRedirectPath = (state,action) => {
    return updatedObjects(state,{authRedirectPath: action.path})
}
const reducer =(state=initialState,action) => {
    switch (action.type) {
        case actionType.AUTH_START: return authStart(state,action);
        case actionType.AUTH_SUCCESS: return authSuccess(state,action);
        case actionType.AUTH_FAIL: return authFail(state,action);
        case actionType.AUTH_LOGOUT: return authLogout(state,action);
        case actionType.SET_AUTH_REDIRECT_PATH: return setauthRedirectPath(state,action);
        default:
            return state;
    }
}

export default reducer;