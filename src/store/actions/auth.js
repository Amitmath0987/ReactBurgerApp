import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (tokenId,userId,SuccessMessage) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        tokenId: tokenId,
        userId:userId,
        SuccessMessage: SuccessMessage
    };
};

export const authFail = (error) => {
    return{
        type:actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logOut = () => {
    localStorage.removeItem('tokenId');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId');

    return{
        type: actionTypes.AUTH_LOGOUT,
        successMessage: 'Logout Successfully'
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut())
        }, expirationTime * 1000);
    }
}

export const auth = (email,password,isSignUp) => {
    return dispatch => {
        // ....request the server
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBT6NOuYVk8BLpCmbBXo6Yp8TRRqS1EFCw';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBT6NOuYVk8BLpCmbBXo6Yp8TRRqS1EFCw';
        }
        axios.post(url, authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() +  response.data.expiresIn * 1000)
            localStorage.setItem('tokenId',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
            
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error.message));
        }) ;
    }
}

export const setauthRedirectPath = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckstate = () => {
    return dispatch =>{
        const tokenId = localStorage.getItem('tokenId');
        if(!tokenId){
            dispatch(logOut());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logOut());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(tokenId,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
    
}