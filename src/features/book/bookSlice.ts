import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchData } from '../fetchAPI/fetchAPI'

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

export type Book = {
  id: number
  ISBN: number
  title: string
  description: string
  publisher: string
  authors: string
  isBorrowed: boolean
  borrowerId: number | null
  published: number
  borrowDate: string | null
  returnDate: string | null
}

export const fetchBooks = createAsyncThunk('books/fetch', async (url: string) => {
  const response = fetchData(url)
  return response
})

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowAndReturn: (state, action) => {
      console.log('Borrow and return')
    },
    addBook: (state, action: PayloadAction<Book>) => {
      state.items?.push(action.payload)
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      // We update the whole data of the book even only one field e.g description changes.
      // Find index of the object needing the update.
      const objIndex = state.items?.findIndex((obj) => obj.id === action.payload.id)
      // Assing the payload to that index.
      if (state.items !== null && objIndex !== undefined) {
        state.items[objIndex] = action.payload
      }
    },
    deleteBook: (state, action: PayloadAction<number>) => {
      state.items = state.items?.filter((item) => action.payload !== item.id) as Book[]
    }
  },
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

export const { borrowAndReturn, addBook, updateBook, deleteBook } = bookSlice.actions

export default bookSlice.reducer
