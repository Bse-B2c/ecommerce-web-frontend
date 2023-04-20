import { lazy } from 'react';

const Product = lazy(() => import('@pages/Product'));
const Products = lazy(() => import('@pages/Products'));

export const routes = [
	{
		name: '/Products',
		path: '/product',
		element: Products,
	},
	{
		name: 'Product',
		path: '/product/:id',
		element: Product,
	},
];
