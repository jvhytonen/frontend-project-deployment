import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('An error occurred')
    }
    const books = response.json()
    return books
  } catch (err) {
    console.log(err)
  }
})

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowAndReturn: (state, action) => {
      console.log('Borrow and return')
    },
    addBook: (state, action) => {
      console.log('Add book')
    },
    updateBook: (state, action) => {
      console.log('Uppdate book')
    },
    deleteBook: (state, action) => {
      console.log('Delete book')
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

export default bookSlice.reducer
