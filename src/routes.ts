import { lazy } from 'react';

const Product = lazy(() => import('@pages/Product'));

export const routes = [
	{
		name: 'Product',
		path: '/product/:id',
		element: Product,
	},
];
