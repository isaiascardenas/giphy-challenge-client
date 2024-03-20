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

const postGif = createAsyncThunk("gifs/postGif", async (data: any) => {
  var formData = new FormData();
  formData.append("title", data.title);
  formData.append("file-input", data.file);
  return await axios
    .post(baseUrl + "/gifs/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      return response.data;
    });
});

const updateGif = createAsyncThunk("gifs/updateGif", async (data: any) => {
  var formData = new FormData();
  formData.append("id", data.id);
  formData.append("slug", data.slug);
  formData.append("url", data.url);
  formData.append("title", data.title);
  formData.append("giphy_id", data.giphy_id);
  formData.append("file-input", data.file);

  return await axios
    .patch(baseUrl + "/gifs/" + data.id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
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
  reducers: {
    setupLoading: (state, _) => {
      state.loading = false;
    },
  },
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

export const { setupLoading } = GifSlice.actions;
export { fetchGifs, getGif, postGif, updateGif, deleteGif };
export default GifSlice.reducer;
