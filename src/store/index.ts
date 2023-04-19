import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '@store/api/productApi';
import { ratingApi } from '@store/api/ratingApi';
import { categoryApi } from '@store/api/categoryApi';

export const store = configureStore({
	reducer: {
		[productApi.reducerPath]: productApi.reducer,
		[ratingApi.reducerPath]: ratingApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
	},
	devTools: true,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([
			productApi.middleware,
			ratingApi.middleware,
			categoryApi.middleware,
		]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
