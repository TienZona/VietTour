// page components
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Login from '~/pages/Auth/Login';
import Register from '~/pages/Auth/Register';
import Detail from '~/pages/Detail';

// layout components
import DefaultLayout from '~/components/Layout/Default';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/home',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/contact',
        component: Contact,
        layout: null,
    },
    {
        path: '/login',
        component: Login,
        layout: null,
    },
    {
        path: '/register',
        component: Register,
        layout: null,
    },
    {
        path: '/detail/:id',
        component: Detail,
        layout: DefaultLayout,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
