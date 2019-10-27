import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux'
import {
  Button,
  Divider,
  Dimmer,
  Form,
  Grid,
  Header,
  Icon,
  Loader,
  Message,
  Segment} from 'semantic-ui-react';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../myroutes';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../../styles/App.scss';

import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
//import AppSidebarNav from './AppSidebarNav';
// AppBreadcrumb from './Breadcrumb2'

class DefaultLayout extends Component {


  loading () { return (<div className="animated fadeIn pt-1 text-center">Loading...</div>)}
  //loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    let sideBarList = this.props.permission.sideBarList;
    let items = [];
    let newSidebarList = [];
    if(sideBarList){
        for(var i in sideBarList){
            items.push(sideBarList[i]);
        }
        newSidebarList = {items:items}
    }
      console.log('side',newSidebarList);
      console.log('side2',navigation);
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={'Loading...'}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={newSidebarList} {...this.props.children.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb  router={router}/>
            <Container fluid>
              <Suspense>
              <Dimmer {...this.props.children.props.isLoaging ? 'active':''}>
                <Loader size='large'>Authenticating...</Loader>
              </Dimmer>
                {this.props.children}
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense >
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense >
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        permission:state.Auth.permissions

    }
};

export default connect(mapStateToProps)(DefaultLayout);

