import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import AuthService from "../../services";

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {value: '', userList: ''};
    }

    componentDidMount() {
        this.props.dispatch(AuthService.userList())
            .catch(({ error, statusCode }) => {
                console.log('error', error);
            })
     }

    

     tabRow(){
        if(this.props.userList instanceof Array){
            return this.props.userList.map(function(object, i){
                return <tr key={i}>
                        <td>{object.id}</td>
                        <td>{object.name}</td>
                        <td>{object.email}</td>
                        <td>{object.created_at}</td>
                    </tr>;
            })
          }
        
    }

    render() {
        

        return (
            <React.Fragment>
                <div className="user-management">
                    <div className="row">
                        <div className="col-md-12 text-right">
                            <Link to="/user/add" className="btn btn-primary btn-sm add-user-btn">Add user</Link>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">User List</h3>

                                    <div className="card-tools">
                                        <div className="input-group input-group-sm" style={{ width: 150 + 'px' }}>
                                            <input type="text" name="table_search" className="form-control float-right"
                                                placeholder="Search" />

                                            <div className="input-group-append">
                                                <button type="submit" className="btn btn-default"><i
                                                    className="fas fa-search"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Created At</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.tabRow()}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userList: state.Auth.data
    }
};

export default connect(mapStateToProps)(Index);

