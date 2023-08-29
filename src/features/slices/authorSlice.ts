import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AuthorState, Author, AuthorPostRequest, AuthorDeleteRequest } from '../types/types'
import { addItem, deleteItem, getItemNoAuth, updateItem } from '../utils/thunks'
//import { API_BASE_URL } from '../../../src/vite-env.e'

const URL = process.env.REACT_APP_API_BASE_URL + 'authors/'

const initialState: AuthorState = {
  items: null,
  isLoading: false,
  error: null
}

export const getAllAuthors = createAsyncThunk('authors/fetch', async () => {
  console.log('URL test')
  console.log(URL)
  console.log(process.env.REACT_APP_API_BASE_URL)
  const req = {
    url: URL
  }
  const response = await getItemNoAuth(req)
  return response
})

export const addNewAuthor = createAsyncThunk('authors/add', async (postReq: AuthorPostRequest) => {
  const req = {
    url: URL,
    token: postReq.token,
    body: postReq.data
  }
  const response = await addItem(req)
  return response
})
export const updateExistingAuthor = createAsyncThunk(
  'authors/update',
  async (postReq: AuthorPostRequest) => {
    const req = {
      url: URL + postReq.data.id,
      token: postReq.token,
      body: postReq.data
    }
    const response = await updateItem(req)
    return response
  }
)

export const deleteAuthor = createAsyncThunk(
  'authors/delete',
  async (request: AuthorDeleteRequest) => {
    const req = {
      url: URL + request.id,
      token: request.token
    }
    const response = await deleteItem(req)
    return response
  }
)

export const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    nullifyAuthorError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAuthors.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(getAllAuthors.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
    builder.addCase(getAllAuthors.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addNewAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      if (state.items !== null) {
        state.items = [...state.items, action.payload]
      } else {
        state.items = [action.payload]
      }
    })
    builder.addCase(addNewAuthor.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
    builder.addCase(addNewAuthor.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateExistingAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      console.log(action.payload)
    })
    builder.addCase(updateExistingAuthor.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateExistingAuthor.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
    builder.addCase(deleteAuthor.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = state.items?.filter((item) => action.payload.id !== item.id) as Author[]
    })
    builder.addCase(deleteAuthor.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteAuthor.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message as string
    })
  }
})

export const { nullifyAuthorError } = authorSlice.actions
export default authorSlice.reducer
