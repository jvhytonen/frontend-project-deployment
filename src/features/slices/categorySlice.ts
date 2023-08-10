import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchData } from '../fetchAPI/fetchAPI'
import { Category, CategoryState, CategoryPostRequest, CategoryDeleteRequest } from '../types/types'
import { apiErrorHandler } from '../utils/errors'
import { deleteItem } from '../utils/thunks'

const initialState: CategoryState = {
  items: null,
  isLoading: false,
  error: null
}

export const getAllCategories = createAsyncThunk('categories/getAll', async () => {
  const URL = 'http://localhost:8081/api/v1/categories/'
  const response = fetchData(URL)
  return response
})

export const addNewCategory = createAsyncThunk(
  'categories/add',
  async (categoryData: CategoryPostRequest) => {
    const URL = 'http://localhost:8081/api/v1/categories/'
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
        'Authorization': `Bearer ${categoryData.token}`
      },
      body: JSON.stringify(categoryData.data)
    })
    if (!response.ok) {
      throw new Error('Adding a category failed!')
    }
    const data = await response.json()
    return data
  }
)

export const updateExistingCategory = createAsyncThunk(
  'categories/update',
  async (request: CategoryPostRequest, { rejectWithValue }) => {
    try {
      const URL = 'http://localhost:8081/api/v1/categories/' + request.data.id
      const response = await fetch(URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line prettier/prettier
          'Authorization': `Bearer ${request.token}`
        },
        body: JSON.stringify(request.data)
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.error
        return rejectWithValue(errorMessage)
      }
      const data = await response.json()
      return data
    } catch (error: any) {
      // Error is temporarily 'any' as otherwise the reject value cannot be returned.
      return rejectWithValue(error.message as string)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (deleteReq: CategoryDeleteRequest, { rejectWithValue }) => {
    const URL = 'http://localhost:8081/api/v1/categories/' + deleteReq.id
    const req = {
      url: URL,
      token: deleteReq.token
    }
    const response = await deleteItem(req)
    return response
  }
)

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
    })
    builder.addCase(addNewCategory.fulfilled, (state, action) => {
      console.log('Category added successfully')
      state.items ? state.items.push(action.payload) : null
    })

    builder.addCase(addNewCategory.pending, (state) => {
      console.log('Adding category...')
    })

    builder.addCase(addNewCategory.rejected, (state) => {
      state.error = 'Failed to add category'
    })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = state.items?.filter((item) => action.payload.id !== item.id) as Category[]
    })
    builder.addCase(deleteCategory.pending, (state) => {
      console.log('deleting category...')
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
