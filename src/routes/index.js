import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Login from '~/pages/Auth/Login';
import Register from '~/pages/Auth/Register';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: null,
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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
