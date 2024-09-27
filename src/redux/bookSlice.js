import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api/book'

export const getAll= createAsyncThunk('book/getAll', async ({ currentPage, limit },thunkAPI) => {
    const url= BASE_URL+`/list?page=${currentPage}&size=${limit}`;
    try {
      const response = await axios.get(url);
      return response.data; // Trả về dữ liệu từ phản hồi
  
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
    }
  });

  export const addNewBook= createAsyncThunk('book/addNewBook', async (book,thunkAPI) => {
    const url= BASE_URL;
    try {
      const response = await axios.post(url, book);
      return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
    }
  });

const bookSlice = createSlice({
    name: 'book',
    initialState: {
    status: 'idle',
    error: null,
    books:null,
    bookDetails: null,
    totalPages:10,
    message:"",
    },
    reducers: {
        resetStatusAndMessage: (state) => {
        state.status = null;
        state.message = "";
        state.error=null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.books = action.payload.data.bookResponseList
            state.totalPages = action.payload.data.totalPages    
        })
        .addCase(addNewBook.fulfilled, (state, action) => {
            state.status=action.payload.status
            state.message=action.payload.message
            state.books = [...state.books, action.payload.data];
          })
        .addCase(addNewBook.rejected, (state, action) => {
            state.status=action.payload.status
            state.message=action.payload.message
            state.error=action.payload.data
        })
    }
})

export const { resetStatusAndMessage } = bookSlice.actions;
export default bookSlice.reducer;