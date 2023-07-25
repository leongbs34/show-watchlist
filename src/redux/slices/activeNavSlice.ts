import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: { active: string } = {
	active: '',
};

const activeNavSlice = createSlice({
	name: 'activeNav',
	initialState,
	reducers: {
		changeActiveNav(state, action: PayloadAction<string>) {
			state.active = action.payload;
		},
	},
});

export const { changeActiveNav } = activeNavSlice.actions;
export default activeNavSlice.reducer;
