import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchData } from '../fetchAPI/fetchAPI'
import { AuthorState, Author } from '../types/types'

const initialState: AuthorState = {
  items: null,
  isLoading: false,
  error: null
}

export const fetchAuthors = createAsyncThunk('authors/fetch', async () => {
  const URL = 'http://localhost:5173/authors.json'
  const response = fetchData(URL)
  return response
})

export const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    addAuthor: (state, action) => {
      // In real project the id will be created in the backend, but now we create id by getting the length of the array so we automatically
      // have unique value in this small example
      const id = state.items ? state.items.length : null
      const newAuthor = {
        ...action.payload,
        id: id
      }
      state.items?.push(newAuthor)
    },
    updateAuthor: (state, action) => {
      // We update the whole data of the author even only one field e.g description changes.
      // Find index of the object needing the update.
      const objIndex = state.items?.findIndex((obj) => obj.id === action.payload.id)
      // Assing the payload to that index.
      if (state.items !== null && objIndex !== undefined) {
        state.items[objIndex] = action.payload
      }
    },
    deleteAuthor: (state, action) => {
      state.items = state.items?.filter((item) => action.payload !== item.id) as Author[]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(fetchAuthors.rejected, (state) => {
      state.isLoading = false
      console.log('An error occurred')
    })
    builder.addCase(fetchAuthors.pending, (state) => {
      state.isLoading = true
    })
  }
})

export const { addAuthor, updateAuthor, deleteAuthor } = authorSlice.actions

export default authorSlice.reducer
