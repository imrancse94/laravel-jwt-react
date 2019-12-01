import React, { Component } from 'react';


class Table extends Component {

    constructor(props) {
        super(props);


    }

    componentDidMount() {

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


    renderTableHeader() {
        if (this.props.tableprops.tableheading instanceof Array) {
            return this.props.tableprops.tableheading.map(function (object, i) {
                return <th key={i}>{object.col}</th>;
            })
        }

    }


    render() {
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        {this.renderTableHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.tabRow()}
                </tbody>
            </table>
        );
    }
}

export default Table;
