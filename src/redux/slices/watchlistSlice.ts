import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface show {
	// id: string;
	episodeWatched: number;
	ratings: number;
}

// interface watchlistState {
// 	shows: show[];
// }
interface watchlistState {
	shows: { [id: string]: show };
}

// const initialState: watchlistState = {
// 	shows: [],
// };
const initialState: watchlistState = {
	shows: {},
};

const watchlistSlice = createSlice({
	name: 'watchlist',
	initialState,
	reducers: {
		addToWatchlist(state, action: PayloadAction<string>) {
			state.shows[action.payload] = { episodeWatched: 0, ratings: 0 };
		},
		removeFromWatchlist(state, action: PayloadAction<string>) {
			// state.shows = state.shows.filter(show => show.id !== action.payload);
			delete state.shows[action.payload];
		},
		changeRatings(
			state,
			action: PayloadAction<{ id: string; ratings: number }>
		) {
			// const showIndex = state.shows.findIndex(
			// 	show => show.id === action.payload.id
			// );
			// state.shows[showIndex].ratings = action.payload.ratings;
			const { id, ratings } = action.payload;
			state.shows[id].ratings = ratings;
		},
		changeEpisodes(
			state,
			action: PayloadAction<{ id: string; episodes: number }>
		) {
			const { id, episodes } = action.payload;
			state.shows[id].episodeWatched = episodes;
		},
	},
});

export const {
	addToWatchlist,
	removeFromWatchlist,
	changeRatings,
	changeEpisodes,
} = watchlistSlice.actions;
export default watchlistSlice.reducer;
