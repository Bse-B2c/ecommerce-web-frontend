import { configureStore } from '@reduxjs/toolkit';
import { publicProductApi } from '@features/Product';

export const store = configureStore({
	reducer: {
		[publicProductApi.reducerPath]: publicProductApi.reducer,
	},
	devTools: true,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([publicProductApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
