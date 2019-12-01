import React, { Component } from 'react'
import { getQueryStringValue } from "../helpers/utils";
import {Link} from 'react-router-dom';
export class Pagination extends Component {
    paginateList() {
        let from = '';
        let per_page = '';
        let last_page = '';
        let next_page_url = '';
        let first_page_url = '';
        let last_page_url = '';
        let prev_page_url = '';
        if(this.props.data){
            prev_page_url = this.props.data.prev_page_url;
            next_page_url = this.props.data.next_page_url;
            
        }

        return {
            prev_page_url:prev_page_url,
            next_page_url:next_page_url
        }
    }

    rows(){
        
        let pathname = window.location.pathname;
        
        let rows = [];
        if(this.props.data){
            for (let i = 1; i <= this.props.data.last_page; i++) {
                rows.push(<li className={i==this.props.data.current_page ? "page-item active":"page-item"} key={i}><Link className="page-link" to={pathname+'/?page='+i} >{i}</Link></li>);
            }
        }
        return rows;
    }

    render() {
        
         
        return (
            <ul className="pagination pagination-sm m-0 float-right">
                <li className={ this.paginateList().last_page_url ? "page-item" :'page-item disabled'}><a className="page-link" href={ this.paginateList().last_page_url ? this.paginateList().last_page_url :'#'}>«</a></li>
                {this.rows()}
                <li className={this.paginateList().next_page_url ? "page-item":'page-item disabled'}><a className="page-link" href={this.paginateList().next_page_url ? this.paginateList().next_page_url:'#'}>»</a></li>
            </ul>
        )
    }
}



export default Pagination;
