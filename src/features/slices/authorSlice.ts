import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchData } from '../fetchAPI/fetchAPI'
import { AuthorState, Author, AuthorPostRequest, AuthorDeleteRequest } from '../types/types'
import { addItem, deleteItem, updateItem } from '../utils/thunks'

const initialState: AuthorState = {
  items: null,
  isLoading: false,
  error: null,
  showSuccessModal: false
}

export const fetchAuthors = createAsyncThunk('authors/fetch', async () => {
  const URL = 'http://localhost:8081/api/v1/authors/'
  const response = fetchData(URL)
  return response
})

export const addNewAuthor = createAsyncThunk('authors/add', async (postReq: AuthorPostRequest) => {
  const req = {
    url: 'http://localhost:8081/api/v1/authors/',
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
      url: 'http://localhost:8081/api/v1/authors/' + postReq.data.id,
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
    const URL = 'http://localhost:8081/api/v1/authors/' + request.id
    const req = {
      url: URL,
      token: request.token
    }
    const response = await deleteItem(req)
    console.log(response)
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
    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(fetchAuthors.rejected, (state) => {
      state.isLoading = false
      state.error = 'An error occured'
    })
    builder.addCase(fetchAuthors.pending, (state) => {
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
    builder.addCase(addNewAuthor.rejected, (state) => {
      state.isLoading = false
      state.error = 'An error occured'
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
      console.log(action.payload)
      state.isLoading = false
      state.error = action.error.message as string
    })
  }
})

export const { nullifyAuthorError } = authorSlice.actions
export default authorSlice.reducer
