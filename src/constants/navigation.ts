enum AppRoutes {
    LOGIN = '/login',
    REGISTER = '/register'
}

interface NavLink {
    id: number;
    path: AppRoutes;
    text: string;
}



export const AUTH_LINKS: NavLink[] = [
    { id: 1, path: AppRoutes.LOGIN, text: 'Login' },
    { id: 2, path: AppRoutes.REGISTER, text: 'Register' }
];