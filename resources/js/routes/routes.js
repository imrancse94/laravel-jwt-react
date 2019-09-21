import Home from '../pages/home'
import Login from './../views/Pages/Login'
import Register from './../views/Pages/Register'
import ForgotPassword from '../pages/forgotPassword'
import ResetPassword from '../pages/resetPassword'
import NoMatch from '../pages/noMatch'
import Breadcrumbs from './../views/Base/Breadcrumbs/Breadcrumbs';
import Dashboard from './../views/Dashboard/Dashboard';
import UserList from './../views/User';
import UserAdd from './../views/User/add';
const routes = [

    {
        path: '/user',
        exact: true,
        auth: true,
        component: UserList
    },
    {
        path: '/user/add',
        exact: true,
        auth: true,
        component: UserAdd
    },

    {
        path: '/home',
        exact: true,
        auth: true,
        component: Dashboard
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Login
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register
    },
    {
        path: '/forgot-password',
        exact: true,
        auth: false,
        component: ForgotPassword
    },
    {
        path: '/reset-password/:token/:email',
        exact: true,
        auth: false,
        component: ResetPassword
    },
    {
        path: '/dashboard',
        exact: true,
        auth: true,
        component: Dashboard
    },
    {
        path: '',
        exact: true,
        auth: false,
        component: NoMatch
    }
];

export default routes;
