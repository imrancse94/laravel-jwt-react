import React, {Component} from 'react';
import ReeValidate from "ree-validate";
import AuthService from "../../services";

class UserAdd extends Component {


    constructor(props) {
        super(props);
        this._isMounted = false;
        ReeValidate.extend('confirmation', (value, [otherValue]) => {
            return value === otherValue;
        }, {
            hasTarget: true,
        });
        this.validator = new ReeValidate({
            name:'required',
            language:'required',
            email: 'required|email',
            password: 'required|min:8',
            password_confirmation: 'required|min:8',
            usergroup_id:'required'
        });


        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
            inputData: {
                name:'',
                email: '',
                password: '',
                language:'',
                password_confirmation:'',
                usergroup_id:''
            },
            responseError:'',
            usergroupList:'',
            isLoading: false,
            errors: this.validator.errors
        };
        this.getUserGroupList = this.getUserGroupList.bind(this);
        this.setstate = this.setstate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);

    }

    setstate(obj){
        if(this._isMounted){
            this.setState(obj);
        }
    }

    componentDidMount(){
        this._isMounted = true;

    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    getUserGroupList() {

        let usergroupList = [];

        this.props.dispatch(AuthService.userGroupList())
            .then(({success, data}) =>{
                if(success){
                    usergroupList = data.map((usergroup) => {
                        return <option  key={usergroup.id} value={usergroup.id}>{usergroup.name}</option>;
                    });
                    this.setstate({usergroupList});
                }

            })
            .catch(({error, statusCode}) => {

                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error
                };

                this.setstate({responseError});
                this.setstate({
                    isLoading: false
                });

            })
    }

    handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);
        const {inputData} = this.state;

        for (let name of data.keys()) {
            const input = form.elements[name];
            const inputName = input.name;
            const value = input.value;
            inputData[inputName] = value;
            this.setstate({inputData});
        }

        this.validator.validateAll(inputData)
            .then(success => {
                if (success) {
                    this.setState({
                        isLoading: true
                    });
                    this.submit(inputData);
                }else{
                    const errors = this.validator.errors;
                    this.setstate({errors});
                }
            });
    }


    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const { errors } = this.validator;
        const {inputData} = this.state;
        inputData[name] = value;

        this.validator.validate(name, value)
            .then(() => {
                this.setstate({errors, inputData});
            });
    }


    render() {
        return (
            <div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="card card-warning">
                            <div className="card-header">
                                <h3 className="card-title">General Elements</h3>
                            </div>
                            <div className="card-body">
                                <form role="form">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Text</label>
                                                <input type="text" className="form-control is-valid" placeholder="Enter ..."/>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Text Disabled</label>
                                                <input type="text" className="form-control" placeholder="Enter ..."
                                                       />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Textarea</label>
                                                <textarea className="form-control" rows="3"
                                                          placeholder="Enter ..."></textarea>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Textarea Disabled</label>
                                                <textarea className="form-control" rows="3" placeholder="Enter ..."
                                                          disabled></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="inputSuccess"><i
                                            className="fas fa-check"></i> Input with
                                            success</label>
                                        <input type="text" className="form-control is-valid" id="inputSuccess"
                                               placeholder="Enter ..."/>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="inputWarning"><i
                                            className="far fa-bell"></i> Input with
                                            warning</label>
                                        <input type="text" className="form-control is-warning" id="inputWarning"
                                               placeholder="Enter ..."/>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="inputError"><i
                                            className="far fa-times-circle"></i> Input with
                                            error</label>
                                        <input type="text" className="form-control is-invalid" id="inputError"
                                               placeholder="Enter ..."/>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">

                                            <div className="form-group">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox"/>
                                                    <label className="form-check-label">Checkbox</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultChecked/>
                                                    <label className="form-check-label">Checkbox checked</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" disabled/>
                                                    <label className="form-check-label">Checkbox disabled</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">

                                            <div className="form-group">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="radio1"/>
                                                    <label className="form-check-label">Radio</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="radio1"
                                                           defaultChecked/>
                                                    <label className="form-check-label">Radio checked</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" disabled/>
                                                    <label className="form-check-label">Radio disabled</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">

                                            <div className="form-group">
                                                <label>Select</label>
                                                <select className="form-control">
                                                    <option>option 1</option>
                                                    <option>option 2</option>
                                                    <option>option 3</option>
                                                    <option>option 4</option>
                                                    <option>option 5</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Select Disabled</label>
                                                <select className="form-control" disabled>
                                                    <option>option 1</option>
                                                    <option>option 2</option>
                                                    <option>option 3</option>
                                                    <option>option 4</option>
                                                    <option>option 5</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">

                                            <div className="form-group">
                                                <label>Select Multiple</label>
                                                <select multiple className="form-control">
                                                    <option>option 1</option>
                                                    <option>option 2</option>
                                                    <option>option 3</option>
                                                    <option>option 4</option>
                                                    <option>option 5</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Select Multiple Disabled</label>
                                                <select multiple className="form-control" disabled>
                                                    <option>option 1</option>
                                                    <option>option 2</option>
                                                    <option>option 3</option>
                                                    <option>option 4</option>
                                                    <option>option 5</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default UserAdd;
