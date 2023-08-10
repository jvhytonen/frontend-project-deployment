import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchData } from '../fetchAPI/fetchAPI'
import {
  CheckoutHandler,
  Copy,
  CopyDeleteRequest,
  CopyPostRequest,
  CopyState,
  NewCopy
} from '../types/types'
import { Checkout } from '../types/types'
import { apiErrorHandler } from '../utils/errors'
import { deleteItem } from '../utils/thunks'

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
  const URL = 'http://localhost:8081/api/v1/book-copies/'
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line prettier/prettier
       'Authorization': `Bearer ${request.token}`
    },
    body: JSON.stringify(request)
  })
  if (!response.ok) {
    console.log(response)
    throw new Error('Adding new copy failed!')
  }
  const data = await response.json()
  console.log(data)
  return data
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

export const handleBorrow = createAsyncThunk(
  'book-copies/borrow',
  async (details: CheckoutHandler) => {
    const URL = 'http://localhost:8081/api/v1/checkouts/borrow/'
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
    if (!response.ok) {
      throw new Error('Error when borrowing book')
    }
    const data = await response.json()
    return data
  }
)

export const handleReturn = createAsyncThunk(
  'book-copies/return',
  async (details: CheckoutHandler) => {
    const URL = 'http://localhost:8081/api/v1/checkouts/return/'
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
    if (!response.ok) {
      throw new Error('Error when borrowing book')
    }
    const data = await response.json()
    return data
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
    builder.addCase(getCopies.rejected, (state) => {
      state.error = 'An error occurred! Try again later'
    })
    builder.addCase(addNewCopy.fulfilled, (state, action) => {
      state.items ? state.items.push(action.payload) : null
    })

    builder.addCase(addNewCopy.pending, (state) => {
      // Handle the pending state if needed
      console.log('Adding copy...')
    })

    builder.addCase(addNewCopy.rejected, (state) => {
      // Handle the error state
      state.error = 'Failed to add new copy'
    })

    builder.addCase(deleteCopy.fulfilled, (state, action) => {
      console.log(action.payload)
      state.items = state.items?.filter((item) => action.payload !== item.bookCopyId) as Copy[]
      console.log('Copy deleted successfully')
    })

    builder.addCase(deleteCopy.pending, (state) => {
      // Handle the pending state if needed
      console.log('Deleting...')
    })

    builder.addCase(deleteCopy.rejected, (state) => {
      // Handle the error state
      state.error = 'Failed to delete copy'
    })
  }
})

export const { nullifyCopyError } = copySlice.actions

export default copySlice.reducer
