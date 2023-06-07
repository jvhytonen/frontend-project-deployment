import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchData } from '../fetchAPI/fetchAPI'
import { Book, BookState } from '../types/types'
import { Checkout, AddNewBookType } from '../types/types'

const initialState: BookState = {
  items: null,
  isLoading: false,
  error: null
}

export const getAllBooks = createAsyncThunk('books/getAll', async () => {
  const URL = 'http://localhost:8081/api/v1/books/'
  const response = fetchData(URL)
  return response
})

export const addNewBook = createAsyncThunk('books/add', async (newBook: AddNewBookType) => {
  const URL = 'http://localhost:8081/api/v1/books/'
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBook)
  })
  if (!response.ok) {
    throw new Error('Adding a book failed!')
  }
  const data = await response.json()
  return data
})
export const deleteBook = createAsyncThunk('books/delete', async (bookId: string) => {
  const URL = 'http://localhost:8081/api/v1/books/' + bookId
  const response = await fetch(URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Error when deleting author')
  }
  const data = await response.json()
  return data
})
export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<AddNewBookType>) => {
      console.log('Add')
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      console.log('Updating')
    },
    removeBook: (state, action: PayloadAction<number>) => {
      console.log('Deleting')
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBooks.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(getAllBooks.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllBooks.rejected, (state) => {
      state.error = 'An error occurred! Try again later'
    })
    builder.addCase(addNewBook.fulfilled, (state, action) => {
      state.isLoading = false
      if (state.items !== null) {
        state.items = [...state.items, action.payload]
      } else {
        state.items = [action.payload]
      }
    })
    builder.addCase(addNewBook.pending, (state) => {
      console.log('Loading')
    })

    builder.addCase(addNewBook.rejected, (state) => {
      state.error = 'Failed to add book'
    })
  }
})

export const { addBook, updateBook, removeBook } = bookSlice.actions

export default bookSlice.reducer
