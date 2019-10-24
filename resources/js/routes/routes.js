import Login from './../views/Pages/Login'
import Register from './../views/Pages/Register'
import NoMatch from './../views/Pages/Page404'
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
