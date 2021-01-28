import React,{Component} from 'react';
import *as action from '../../../store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
class Logout extends Component{
    componentDidMount(){
        this.props.onLogout();
    }
    
    render(){
        
        return(
            <Redirect to={'/'} />
        )
    }
}

// const mapStateToProps = state => {
//     return{
//         Loading: state.authReducer.loading
//         }
//     }

const mapDisaptchToProps = dispatch =>{
    return{
        onLogout: () => dispatch(action.logOut())
    }
}
export default connect(null,mapDisaptchToProps) (Logout);