import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import localforage from 'localforage';

interface show {
	episodeWatched: number;
	ratings: number;
}

export interface showsType {
	[id: string]: show;
}

interface watchlistState {
	shows: showsType;
}

const initialState: watchlistState = {
	shows: {},
};

const setLocalStorage = (state: showsType) => {
	const shows = JSON.parse(JSON.stringify(state));

	localforage.setItem('watchlist', shows).catch(function (err) {
		// This code runs if there were any errors
		console.log(err);
	});
};

const watchlistSlice = createSlice({
	name: 'watchlist',
	initialState,
	reducers: {
		setWatchlist(state, action: PayloadAction<showsType>) {
			state.shows = action.payload;
		},
		addToWatchlist(state, action: PayloadAction<string>) {
			state.shows[action.payload] = { episodeWatched: 0, ratings: 0 };

			setLocalStorage(state.shows);
		},
		removeFromWatchlist(state, action: PayloadAction<string>) {
			delete state.shows[action.payload];

			setLocalStorage(state.shows);
		},
		changeRatings(
			state,
			action: PayloadAction<{ id: string; ratings: number }>
		) {
			const { id, ratings } = action.payload;
			state.shows[id].ratings = ratings;

			setLocalStorage(state.shows);
		},
		changeEpisodes(
			state,
			action: PayloadAction<{ id: string; episodes: number }>
		) {
			const { id, episodes } = action.payload;
			state.shows[id].episodeWatched = episodes;

			setLocalStorage(state.shows);
		},
	},
});

export const {
	setWatchlist,
	addToWatchlist,
	removeFromWatchlist,
	changeRatings,
	changeEpisodes,
} = watchlistSlice.actions;
export default watchlistSlice.reducer;
