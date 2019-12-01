import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import AuthService from "../../services";
import Table from "../../components/Table";
import {getQueryStringValue} from '../../helpers/utils';
import { Pagination } from "../../components/Pagination";


class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '', userList: '', table: '' };
    }

    componentDidMount() {
        let page = getQueryStringValue('page');
        if(!page){
            page = 1;
        }
        
        this.props.dispatch(AuthService.userList(page))
            .catch(({ error, statusCode }) => {

            })
    }

    tabRow() {

        if (this.props.userList instanceof Array) {
            return this.props.userList.map(function (object, i) {
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
                                    <h3 className="card-title">{this.props.tableprops.tableTitle ? this.props.tableprops.tableTitle : ''}</h3>
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
                                    <Table {...this.props} />
                                </div>
                                <div className="card-footer clearfix">
                                    <Pagination {...this.props.pagination}/>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const tableprops = () => {
    return {
        tableTitle: "User List",
    }
}


const mapStateToProps = (state) => {
    let userlist = null;
    let current_page = 1;
    let paginate = null;
    if (state.Auth.data) {
        userlist = state.Auth.data.data;
        current_page = state.Auth.data.current_page;
        paginate = state.Auth.data;
    }
    return {
        userList: userlist,
        tableprops: {
            tableTitle: "User List",
            tableheading: [
                { col: 'ID' },
                { col: 'Username' },
                { col: 'Email' },
                { col: 'Created At' },
            ],
            current_page: current_page
        },
        pagination:{
            data:paginate
        }
    }

};

export default connect(mapStateToProps)(Index);

