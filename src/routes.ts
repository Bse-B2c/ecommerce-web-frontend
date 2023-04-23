import { lazy } from 'react';

const Login = lazy(() => import('@pages/Login'));
const SignUp = lazy(() => import('@pages/SignUp'));
const Product = lazy(() => import('@pages/Product'));
const Products = lazy(() => import('@pages/Products'));

export const routes = [
	{
		name: 'Login',
		path: '/login',
		element: Login,
	},
	{
		name: 'Sign Up',
		path: 'signup',
		element: SignUp,
	},
	{
		name: 'Products',
		path: '/product',
		element: Products,
	},
	{
		name: 'Product',
		path: '/product/:id',
		element: Product,
	},
];
