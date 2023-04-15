import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '@store/api/productApi';

export const store = configureStore({
	reducer: {
		[productApi.reducerPath]: productApi.reducer,
	},
	devTools: true,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([productApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
