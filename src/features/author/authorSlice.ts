import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchData } from '../fetchAPI/fetchAPI'

type AuthorState = {
  items: Author[] | null
  isLoading: boolean
  error: null | string
}

const initialState: AuthorState = {
  items: null,
  isLoading: false,
  error: null
}

export type Author = {
  id: number
  name: string
  description: string
}

export const fetchAuthors = createAsyncThunk('authors/fetch', async (url: string) => {
  const response = fetchData(url)
  return response
})

export const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    addAuthor: (state, action) => {
      state.items?.push(action.payload)
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
