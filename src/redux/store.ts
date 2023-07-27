import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from './slices/watchlistSlice';
import activeNavSlice from './slices/activeNavSlice';

export const store = configureStore({
	reducer: {
		watchlist: watchlistReducer,
		activeNav: activeNavSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
