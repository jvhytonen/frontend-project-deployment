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
      console.log('Add author')
    },
    updateAuthor: (state, action) => {
      console.log('Update author')
    },
    deleteAuthor: (state, action) => {
      console.log('Delete author')
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

export default authorSlice.reducer
