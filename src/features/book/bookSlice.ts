import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Book } from '../../data/books'
import { books } from '../../data/books.js'

type BookState = {
  items: Book[] | null
  isLoading: boolean
  error: null | string
}

const initialState: BookState = {
  items: null,
  isLoading: false,
  error: null
}

export const fetchBooks = createAsyncThunk('books/fetch', async () => {
  // Async fetch here. Needs to changed if we use this to get data about books.
  const response = books
  return response
  /* try {
    const response = await fetch('URL Here')
    if (!response.ok) {
      throw new Error('An error occurred')
    }
    const books = response.json()
    return books
  } catch (err) {
    console.log(err)
  } */
})

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchBooks.rejected, (state) => {
      state.error = 'An error occurred! Try again later'
    })
  }
})

export default bookSlice.reducer
