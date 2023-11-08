import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_BASE_URL } from '../utils/variables'

const URL_COPIES = API_BASE_URL + 'book-copies/'
const URL_BORROW = API_BASE_URL + 'checkouts/borrow/'
const URL_RETURN = API_BASE_URL + 'checkouts/return/'

import { addItem, deleteItem, getItemNoAuth } from '../utils/thunks'
import { Copy, CopyState } from '../types/reduxTypes'
import { CheckoutRequest, CopyDeleteRequest, CopyPostRequest } from '../types/requestTypes'

const initialState: CopyState = {
  items: null,
  isLoading: false,
  error: null
}

export const getCopies = createAsyncThunk('book-copies/fetch', async (id: string) => {
  console.log(id)
  const req = {
    url: URL_COPIES + id
  }
  const response = await getItemNoAuth(req)
  //console.log(response)
  return response
})

export const addNewCopy = createAsyncThunk('book-copies/add', async (request: CopyPostRequest) => {
  const req = {
    url: URL_COPIES,
    token: request.token,
    body: request
  }
  const response = await addItem(req)
  return response
})

export const deleteCopy = createAsyncThunk(
  'book-copies/delete',
  async (request: CopyDeleteRequest) => {
    const req = {
      url: URL_COPIES + request.id,
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
      url: URL_BORROW,
      token: postReq.token,
      body: postReq.data
    }
    console.log('jh')
    console.log(req)
    const response = await addItem(req)
    return response
  }
)
export const returnCopy = createAsyncThunk(
  'book-copies/return',
  async (postReq: CheckoutRequest) => {
    const req = {
      url: URL_RETURN,
      token: postReq.token,
      body: postReq.data
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
      state.items = state.items?.filter((item) => action.payload !== item.id) as Copy[]
    })

    builder.addCase(deleteCopy.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(deleteCopy.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message as string
    })
    builder.addCase(borrowCopy.fulfilled, (state, action) => {
      const newCheckout = action.payload
      if (state.items === null) {
        state.items = [newCheckout]
      }
      const objIndexToUpdate = state.items?.findIndex((obj) => obj.id === newCheckout.bookCopyId)
      if (objIndexToUpdate === -1 || objIndexToUpdate === undefined) {
        state.items.push(newCheckout)
      } else {
        state.items[objIndexToUpdate] = { ...state.items[objIndexToUpdate], ...newCheckout }
      }
    })

    builder.addCase(borrowCopy.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(borrowCopy.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message as string
    })
  }
})

export const { nullifyCopyError } = copySlice.actions

export default copySlice.reducer
