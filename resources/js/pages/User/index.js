import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom'
class Index extends Component {
    render() {
        return (
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
                                <h3 className="card-title">Responsive Hover Table</h3>

                                <div className="card-tools">
                                    <div className="input-group input-group-sm" style={{width: 150 + 'px'}}>
                                        <input type="text" name="table_search" className="form-control float-right"
                                               placeholder="Search"/>

                                        <div className="input-group-append">
                                            <button type="submit" className="btn btn-default"><i
                                                className="fas fa-search"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body table-responsive p-0">
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Reason</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>183</td>
                                        <td>John Doe</td>
                                        <td>11-7-2014</td>
                                        <td><span className="tag tag-success">Approved</span></td>
                                        <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect()(Index);

