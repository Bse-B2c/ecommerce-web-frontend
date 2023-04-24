import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '@store/api/productApi';
import { ratingApi } from '@store/api/ratingApi';
import { categoryApi } from '@store/api/categoryApi';
import { accountApi } from '@store/api/accountApi';
import notificationReducer from '@store/notification/notificationSlice';

export const store = configureStore({
	reducer: {
		[productApi.reducerPath]: productApi.reducer,
		[ratingApi.reducerPath]: ratingApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
		[accountApi.reducerPath]: accountApi.reducer,
		notification: notificationReducer,
	},
	devTools: true,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([
			productApi.middleware,
			ratingApi.middleware,
			categoryApi.middleware,
			accountApi.middleware,
		]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
