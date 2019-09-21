import React from 'react'
import {connect} from 'react-redux';


class Page extends React.Component {
    constructor(props){
        super(props);
        
        //Redirect default
        
        if(props.isAuthenticated && props.location.pathname === '/'){
            props.history.push('/home');
        }else if(!props.isAuthenticated && props.location.pathname === '/'){
            props.history.push('/login');
        }
    }



    render() {
        
        return(
            <React.Fragment>
                
                <h1>Not found</h1>
     
   
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated
    }
};
export default connect(mapStateToProps)(Page);