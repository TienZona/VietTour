// page components
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Login from '~/pages/Auth/Login';
import Register from '~/pages/Auth/Register';

// layout components
import DefaultLayout from '~/components/Layout/Default';

const publicRoutes = [
    {
        path: '/',
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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
