import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '@store/api/productApi';
import { ratingApi } from '@store/api/ratingApi';
import { categoryApi } from '@store/api/categoryApi';
import { accountApi } from '@store/api/accountApi';
import { zipCodeApi } from '@store/api/zipCodeApi';
import { orderApi } from '@store/api/orderApi';
import notificationReducer from '@store/notification/notificationSlice';

export const store = configureStore({
	reducer: {
		[productApi.reducerPath]: productApi.reducer,
		[ratingApi.reducerPath]: ratingApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
		[accountApi.reducerPath]: accountApi.reducer,
		[zipCodeApi.reducerPath]: zipCodeApi.reducer,
		[orderApi.reducerPath]: orderApi.reducer,
		notification: notificationReducer,
	},
	devTools: true,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([
			productApi.middleware,
			ratingApi.middleware,
			categoryApi.middleware,
			accountApi.middleware,
			zipCodeApi.middleware,
			orderApi.middleware,
		]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
