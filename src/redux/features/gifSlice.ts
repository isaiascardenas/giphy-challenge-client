import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseUrl = 'http://localhost:3000/api';

export interface Gif {
	id: number;
	name: string;
}

interface GifState {
	loading: boolean;
	gifs: Gif[];
	error: string;
}

const initialState: GifState = {
	loading: true,
	error: '',
	gifs: [],
};

export const fetchGifs = createAsyncThunk('gifs/fetch', async () => {
	return await axios.get(baseUrl + '/gifs')
		.then(function(response) {
			console.log(response);
			//state.gifs.push(action.payload);
			return response.data;
		});
})

export const GifSlice = createSlice({
	name: "gifs",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchGifs.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fetchGifs.fulfilled, (state, action) => {
			state.loading = false
			state.gifs = action.payload.data
			state.error = ''
		})
		builder.addCase(fetchGifs.rejected, (state, action) => {
			state.loading = false
			state.gifs = []
			state.error = action.error.message ?? ''
		})
	},
});

export default GifSlice.reducer;
