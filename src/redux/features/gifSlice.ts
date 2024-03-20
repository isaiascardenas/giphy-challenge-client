import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3000/api";

export interface Paginator {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface Gif {
  id: number;
  title: string;
  giphy_id: string;
  slug: string;
  url: string;
  created_at: string;
  updated_at: string;
}

interface GifState {
  loading: boolean;
  error: string;
  gifs: Gif[];
  selection?: Gif;
  paginator: Paginator;
}

const initialState: GifState = {
  loading: true,
  error: "",
  gifs: [],
  selection: undefined,
  paginator: {
    page: 1,
    pageSize: 0,
    total: 0,
    totalPages: 0,
  },
};

const fetchGifs = createAsyncThunk("gifs/fetchGifs", async (params) => {
  return await axios
    .get(baseUrl + "/gifs", { params: params })
    .then(function (response) {
      return response.data;
    });
});

const getGif = createAsyncThunk("gifs/getGif", async (id) => {
  return await axios.get(baseUrl + "/gifs/" + id).then(function (response) {
    return response.data;
  });
});

const postGif = createAsyncThunk("gifs/postGif", async (data) => {
  return await axios.post(baseUrl + "/gifs/", data).then(function (response) {
    return response.data;
  });
});

const updateGif = createAsyncThunk("gifs/updateGif", async (data: Gif) => {
  return await axios
    .patch(baseUrl + "/gifs/" + data.id, data)
    .then(function (response) {
      return response.data;
    });
});

const deleteGif = createAsyncThunk("gifs/deleteGif", async (id) => {
  return await axios.delete(baseUrl + "/gifs/" + id).then(function (response) {
    return response.data;
  });
});

export const GifSlice = createSlice({
  name: "gifs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchGifs Reducer
    builder.addCase(fetchGifs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGifs.fulfilled, (state, action) => {
      state.loading = false;
      state.gifs = action.payload.data;
      state.paginator = action.payload.pagination;
      state.error = "";
    });
    builder.addCase(fetchGifs.rejected, (state, action) => {
      state.loading = false;
      state.gifs = [];
      state.error = action.error.message ?? "";
    });

    // getGif Reducer
    builder.addCase(getGif.pending, (state) => {
      state.gifs = [];
      state.loading = true;
    });
    builder.addCase(getGif.fulfilled, (state, action) => {
      state.loading = false;
      state.selection = action.payload.data[0];
      state.error = "";
    });
    builder.addCase(getGif.rejected, (state, action) => {
      state.loading = false;
      state.gifs = [];
      state.selection = undefined;
      state.error = action.error.message ?? "";
    });

    // postGif Reducer
    builder.addCase(postGif.pending, (state) => {
      state.gifs = [];
      state.loading = true;
    });
    builder.addCase(postGif.fulfilled, (state, action) => {
      state.loading = false;
      state.selection = action.payload.data[0];
      state.error = "";
    });
    builder.addCase(postGif.rejected, (state, action) => {
      state.loading = false;
      state.gifs = [];
      state.selection = undefined;
      state.error = action.error.message ?? "";
    });
  },
});

export { fetchGifs, getGif, postGif, updateGif, deleteGif };
export default GifSlice.reducer;
