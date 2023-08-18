import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchData } from '../fetchAPI/fetchAPI'
import { Category, CategoryState, CategoryPostRequest, CategoryDeleteRequest } from '../types/types'
import { addItem, deleteItem, getItemNoAuth, updateItem } from '../utils/thunks'

const initialState: CategoryState = {
  items: null,
  isLoading: false,
  error: null
}

export const getAllCategories = createAsyncThunk('categories/getAll', async () => {
  const req = {
    url: 'http://localhost:8081/api/v1/categories/'
  }
  const response = await getItemNoAuth(req)
  return response
})

export const addNewCategory = createAsyncThunk(
  'categories/add',
  async (postReq: CategoryPostRequest) => {
    const req = {
      url: 'http://localhost:8081/api/v1/categories/',
      token: postReq.token,
      body: postReq.data
    }
    const response = await addItem(req)
    return response
  }
)
export const updateExistingCategory = createAsyncThunk(
  'categories/update',
  async (postReq: CategoryPostRequest) => {
    const req = {
      url: 'http://localhost:8081/api/v1/categories/' + postReq.data.id,
      token: postReq.token,
      body: postReq.data
    }
    const response = await updateItem(req)
    return response
  }
)

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (deleteReq: CategoryDeleteRequest) => {
    const req = {
      url: 'http://localhost:8081/api/v1/categories/' + deleteReq.id,
      token: deleteReq.token
    }
    const response = await deleteItem(req)
    return response
  }
)

const categoryConfirmation = {
  type: 'confirmation',
  heading: 'Confirm adding new category',
  message: 'Are you sure you want to add a new category?'
}
const categorySuccess = {
  type: 'success',
  heading: 'Category added successfully',
  message: ''
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  // Normal reducers only needed for TypeScript
  reducers: {
    nullifyCategoryError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(getAllCategories.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllCategories.rejected, (state) => {
      state.error = 'An error occurred! Try again later'
      state.isLoading = false
    })
    builder.addCase(addNewCategory.fulfilled, (state, action) => {
      state.items ? state.items.push(action.payload) : null
      state.isLoading = false
    })

    builder.addCase(addNewCategory.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(addNewCategory.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = state.items?.filter((item) => action.payload.id !== item.id) as Category[]
    })
    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message as string
    })
    builder.addCase(updateExistingCategory.fulfilled, (state, action) => {
      state.isLoading = false
      console.log(action.payload)
    })
    builder.addCase(updateExistingCategory.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateExistingCategory.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
  }
})

export const { nullifyCategoryError } = categorySlice.actions

export default categorySlice.reducer
