import React from 'react'
import { connect } from 'react-redux'
import DefaultLayout from './containers/DefaultLayout';
import AuthService from './services';
import { initAuthFromExistingToken } from './services/authService';

class Main extends React.Component {

    constructor(props){
        super(props);
        //props.dispatch(AuthService.authchek());


    }

    componentDidMount(){
      //this.props.initAuthFromExistingToken();
    }
    render() {
        return (

            <div>
                {this.props.isAuthenticated ? (
                    <React.Fragment>
                        <DefaultLayout {...this.props}  />
                    </React.Fragment>
                ) : (
                    <main className="fadeIn animated">
                        {this.props.children}
                    </main>
                    )}
            </div>);

    }
}

const mapStateToProps = (state) => {

    return {
        isAuthenticated: state.Auth.isAuthenticated


    }
};
const mapDispatchToProps = {
  initAuthFromExistingToken
};
export default connect(mapStateToProps,mapDispatchToProps)(Main);
