import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchData } from '../fetchAPI/fetchAPI'
import {
  CheckoutData,
  CheckoutRequest,
  Copy,
  CopyDeleteRequest,
  CopyPostRequest,
  CopyState,
  NewCopy,
  PostRequest
} from '../types/types'
import { Checkout } from '../types/types'
import { apiErrorHandler } from '../utils/errors'
import { addItem, deleteItem } from '../utils/thunks'

const initialState: CopyState = {
  items: null,
  isLoading: false,
  error: null
}

export const getCopies = createAsyncThunk('book-copies/fetch', async (id: string) => {
  const URL = 'http://localhost:8081/api/v1/book-copies/' + id
  const response = fetchData(URL)
  return response
})

export const addNewCopy = createAsyncThunk('book-copies/add', async (request: CopyPostRequest) => {
  const req = {
    url: 'http://localhost:8081/api/v1/book-copies/',
    token: request.token,
    body: request
  }
  const response = await addItem(req)
  return response
})

export const deleteCopy = createAsyncThunk(
  'book-copies/delete',
  async (request: CopyDeleteRequest) => {
    console.log(request.id)
    const URL = 'http://localhost:8081/api/v1/book-copies/' + request.id
    const req = {
      url: URL,
      token: request.token
    }
    const response = await deleteItem(req)
    return response
  }
)

export const borrowCopy = createAsyncThunk(
  'book-copies/borrow',
  async (postReq: CheckoutRequest) => {
    const req = {
      url: 'http://localhost:8081/api/v1/checkouts/borrow/',
      token: postReq.token,
      body: postReq.body
    }
    const response = await addItem(req)
    return response
  }
)
export const returnCopy = createAsyncThunk(
  'book-copies/return',
  async (postReq: CheckoutRequest) => {
    const req = {
      url: 'http://localhost:8081/api/v1/checkouts/return/',
      token: postReq.token,
      body: postReq.body
    }
    const response = await addItem(req)
    return response
  }
)

export const copySlice = createSlice({
  name: 'copies',
  initialState,
  reducers: {
    nullifyCopyError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCopies.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(getCopies.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCopies.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message as string
    })
    builder.addCase(addNewCopy.fulfilled, (state, action) => {
      state.items ? state.items.push(action.payload) : null
    })

    builder.addCase(addNewCopy.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(addNewCopy.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message as string
    })

    builder.addCase(deleteCopy.fulfilled, (state, action) => {
      state.items = state.items?.filter((item) => action.payload !== item.bookCopyId) as Copy[]
    })

    builder.addCase(deleteCopy.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(deleteCopy.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message as string
    })
  }
})

export const { nullifyCopyError } = copySlice.actions

export default copySlice.reducer
