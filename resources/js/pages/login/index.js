import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    FormFeedback
} from 'reactstrap';
import ReeValidate from "ree-validate";
import AuthService from "../../services";
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import PropTypes from 'prop-types';
import {formvalidation} from "../../helpers/utils";
import "../../styles/login.css";

class Index extends Component {

    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            email: 'required|email',
            password: 'required|min:6'
        });

        this.state = {
            credentials: {
                email: '',
                password: '',
                active: false
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            isLoading: false,
            errors: this.validator.errors
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleShow() {
        this.props.dispatch(actions.setLoader())
        console.log('sss', this.props);
    }

    handleHide() {
        this.props.dispatch(actions.disableLoader())
        console.log('sss', this.props);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const {errors} = this.validator;
        const {credentials} = this.state;
        credentials[name] = value;
        //formvalidation(credentials);

        this.validator.validate(name, value)
            .then(() => {
                this.setState({errors, credentials})
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        const {credentials} = this.state;
        console.log(credentials);
        this.validator.validateAll(credentials)
            .then(success => {
                if (success) {
                    this.setState({
                        isLoading: true
                    });
                    this.submit(credentials);
                }
            });
    }

    submit(credentials) {
        this.props.dispatch(AuthService.login(credentials))
            .catch(({error, statusCode}) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error
                };
                this.setState({responseError});
                this.setState({
                    isLoading: false
                });
            })

    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        const {isAuthenticated} = this.props;
        console.log('sss', isAuthenticated);
        if (isAuthenticated) {
            return (
                <Redirect to={from}/>
            )
        }
        return (
            <div className="login">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="text" name="email" placeholder="Username" required="required"/>
                    <input onChange={this.handleChange} type="password" name="password" placeholder="Password" required="required"/>
                    <button type="submit" className="btn btn-primary btn-block btn-large">Login</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
    }
};

Index.propTypes = {
    dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(Index)

