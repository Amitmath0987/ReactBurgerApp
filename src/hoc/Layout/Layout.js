import React ,{Component} from 'react';
import Aux from '../Auxilliary/Auxilliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class Layout extends Component{
    state= {
        showSideDrawer: false
    }
    sideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
            
        });
    }
    render(){
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}
                isAuthenticate={this.props.IsAuthenticate}/>
                <SideDrawer 
                isAuthenticate={this.props.IsAuthenticate}
                open={this.state.showSideDrawer}
                closed={this.sideDrawerHandler}/>
                <main className= {classes.Content}>{this.props.children}</main>
            </Aux>

        )
    }
} 


const mapStateToProps = state => {
    return{
        IsAuthenticate: state.authReducer.tokenId !== null
    }
}
export default connect(mapStateToProps) (Layout);