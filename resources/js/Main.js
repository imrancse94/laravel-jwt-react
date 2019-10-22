import React from 'react'
import { connect } from 'react-redux'
import DefaultLayout from './containers/DefaultLayout';


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
        isAuthenticated: state.Auth.isAuthenticated,
        permission:state.Auth.permissions

    }
};

export default connect(mapStateToProps)(Main);
