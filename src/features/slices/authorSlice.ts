import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchData } from '../fetchAPI/fetchAPI'
import { AuthorState, Author, AuthorPostRequest, AuthorDeleteRequest } from '../types/types'
import { deleteItem } from '../utils/thunks'

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

export const addNewAuthor = createAsyncThunk(
  'authors/add',
  async (newAuthorReq: AuthorPostRequest) => {
    const URL = 'http://localhost:8081/api/v1/authors/'
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
        'Authorization': `Bearer ${newAuthorReq.token}`
      },
      body: JSON.stringify(newAuthorReq.data)
    })
    if (!response.ok) {
      throw new Error('Error when adding author')
    }
    const data = await response.json()
    return data
  }
)

export const updateExistingAuthor = createAsyncThunk(
  'authors/update',
  async (request: AuthorPostRequest, { rejectWithValue }) => {
    try {
      const URL = 'http://localhost:8081/api/v1/authors/' + request.data.id
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
    addAuthor: (state, action: PayloadAction<Author>) => {
      // In real project the id will be created in the backend, but now we create id by getting the length of the array so we automatically
      // have unique value in this small example
      const newAuthor: Author = {
        ...action.payload
      }
      if (state.items !== null) {
        state.items = [...state.items, newAuthor]
      } else {
        state.items = [newAuthor]
      }
    },
    updateAuthor: (state, action: PayloadAction<Author>) => {
      // We update the whole data of the author even only one field e.g description changes.
      // Find index of the object needing the update.
      const objIndex = state.items?.findIndex((obj) => obj.id === action.payload.id)
      // Assing the payload to that index.
      if (state.items !== null && objIndex !== undefined) {
        state.items[objIndex] = action.payload
      }
    },
    removeAuthor: (state, action: PayloadAction<string>) => {
      state.items = state.items?.filter((item) => action.payload !== item.id) as Author[]
    },
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

export const { addAuthor, updateAuthor, removeAuthor, nullifyAuthorError } = authorSlice.actions

export default authorSlice.reducer
