import { lazy, LazyExoticComponent } from 'react';

const Unauthorized = lazy(() => import('@pages/Unauthorized'));
const Login = lazy(() => import('@pages/Login'));
const SignUp = lazy(() => import('@pages/SignUp'));
const Product = lazy(() => import('@pages/Product'));
const Products = lazy(() => import('@pages/Products'));
const Account = lazy(() => import('@pages/Account'));
const ShopCart = lazy(() => import('@pages/ShopCart'));
const MyData = lazy(() => import('@pages/MyData'));
const MyOrderHistory = lazy(() => import('@pages/MyOrderHistory'));

interface BasicRoute {
	name: string;
	path: string;
	auth?: boolean;
	element: LazyExoticComponent<any>;
}

interface Route extends BasicRoute {
	children?: Array<BasicRoute>;
}

export const routes: Array<Route> = [
	{
		name: 'ShopCart',
		path: '/shopcart',
		auth: true,
		element: ShopCart,
	},
	{
		name: 'Unauthorize',
		path: '/unauthorized',
		element: Unauthorized,
	},
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
		path: '/',
		element: Products,
	},
	{
		name: 'Product',
		path: '/product/:id',
		element: Product,
	},
	{
		name: 'Account',
		path: '/account',
		auth: true,
		element: Account,
		children: [
			{
				name: 'My Data',
				path: 'data',
				element: MyData,
			},
			{
				name: 'My Order History',
				path: 'order',
				element: MyOrderHistory,
			},
		],
	},
];
