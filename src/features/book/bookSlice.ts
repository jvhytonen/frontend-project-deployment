import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchData } from '../fetchAPI/fetchAPI'
import { Book, BookState } from '../types/types'
import { BorrowBook, ReturnBook } from '../types/types'

const initialState: BookState = {
  items: null,
  isLoading: false,
  error: null
}

export const fetchBooks = createAsyncThunk('books/fetch', async () => {
  const URL = 'http://localhost:5173/books.json'
  const response = fetchData(URL)
  return response
})

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook: (state, action: PayloadAction<BorrowBook>) => {
      // The return date will be 30 days after the borrowing.
      const today = new Date()
      const returnDay = today.setDate(today.getDate() + 30)
      const objIndex = state.items?.findIndex((obj) => obj.id === action.payload.bookId)
      if (state.items !== null && objIndex !== undefined) {
        state.items[objIndex] = {
          ...state.items[objIndex],
          borrowerId: action.payload.borrowerId,
          isBorrowed: true,
          returnDate: returnDay
        }
      }
    },
    returnBook: (state, action: PayloadAction<ReturnBook>) => {
      const objIndex = state.items?.findIndex((obj) => obj.id === action.payload.bookId)
      if (state.items !== null && objIndex !== undefined) {
        state.items[objIndex] = {
          ...state.items[objIndex],
          isBorrowed: false,
          returnDate: null
        }
      }
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

export const { borrowBook, returnBook, addBook, updateBook, deleteBook } = bookSlice.actions

export default bookSlice.reducer
