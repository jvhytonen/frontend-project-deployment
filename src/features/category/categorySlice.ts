import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchData } from '../fetchAPI/fetchAPI'
import { Category, CategoryState, NewCategory } from '../types/types'

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
  async (newCategory: NewCategory) => {
    const URL = 'http://localhost:8081/api/v1/categories/'
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCategory)
    })
    if (!response.ok) {
      throw new Error('Adding a category failed!')
    }
    const data = await response.json()
    return data
  }
)

export const bookSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<NewCategory>) => {
      console.log('Add')
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      console.log('Updating')
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      console.log('Deleting')
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
  }
})

export const { addCategory, updateCategory, deleteCategory } = bookSlice.actions

export default bookSlice.reducer
