import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import Category from "../components/pageProps/shopPage/shopBy/Category";
const BASE_URL = 'http://localhost:8080/api/category'

export const getAllCategories= createAsyncThunk('category/getAllCategories', async ({ currentPage, limit },thunkAPI) => {
    const url= BASE_URL+`/list?page=${currentPage}&size=${limit}`;
    try {
      const response = await axios.get(url);
      return response.data; // Trả về dữ liệu từ phản hồi
  
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
    }
  });

  const categorySlice = createSlice({
    name: 'category',
    initialState: {
        status: 'idle',
        error: null,
        categories: [], // Khởi tạo categories là một mảng rỗng
        categoryDetails: null,
        totalPages: 10,
        message: "",
    },
    reducers: {
        resetStatusAndMessage: (state) => {
            state.status = null;
            state.message = "";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.categories = action.payload.data.categoryResponseList;
                state.totalPages = action.payload.data.totalPages;    
            });
    }
});


export const { resetStatusAndMessage } = categorySlice.actions;
export default categorySlice.reducer;