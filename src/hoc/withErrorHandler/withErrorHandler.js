import React,{useState,useEffect} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxilliary/Auxilliary';
// import axios from 'axios';
const withErrorHandler = (WrappedComponent,axios) => {
    return (props) => {
       const [error,setState]  = useState({
           error: null,
           Backdrop: true

       });
    const requestInterceptor = axios.interceptors.request.use(req => {
        setState({error: null});
        return req;
    }
);  
const responseInterceptor = axios.interceptors.response.use(res => res,error => {
    setState({error: error});
    return Promise.reject(error);
});


useEffect(
    ()=>{
    return () => {
        // console.log(requestInterceptor,responseInterceptor);
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
    };
   

},
)
const backDropHandler = () => {
    setState({error: null});
}
// console.log(requestInterceptor,responseInterceptor);

// modalClosed={this.purchaseCancelHandler}
        return(
            <Aux>
            <Modal show = {error.error !== null}
            modalClosed={backDropHandler}
            >
            {error.error !== null ? error.error.message : null}
            </Modal>
            <WrappedComponent {...props}/> 
            </Aux>
        );
    }
}

//    return withErrorHandler = props => {
//     return(
//         <Aux>
//         <Modal show={this.state.error}
//         modalClosed={this.errorConfirmedHandler}>
//            {this.state.error ? this.state.error.message :null }
//         </Modal>
//         <WrappedComponent {...this.props} />
//         </Aux>
        
//     );
// }
// } 

//    }
//         state = {
//             error: null
//         }

//         componentDidMount () {
//             axios.interceptors.request.use(req => {
//                 this.setState({error: null});
//                 return req;
//             });
//             axios.interceptors.response.use(res => res,error => {
//                 this.setState({error: error});
//                 //  console.log(error);
//             });
//         }

//         errorConfirmedHandler = () => {
//             this.setState({error:null })
//         }
//         render(){
            
// }

export default withErrorHandler;