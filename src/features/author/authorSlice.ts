import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchData } from '../fetchAPI/fetchAPI'
import { AuthorState, Author, AddAuthorType } from '../types/types'
import { useDispatch } from 'react-redux'

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

export const addNewAuthor = createAsyncThunk('authors/add', async (newAuthor: AddAuthorType) => {
  const URL = 'http://localhost:8081/api/v1/authors/'
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAuthor)
  })
  if (!response.ok) {
    throw new Error('Error when borrowing book')
  }
  const data = await response.json()
  return data
})

export const deleteAuthor = createAsyncThunk('authors/delete', async (authorId: string) => {
  const URL = 'http://localhost:8081/api/v1/authors/' + authorId
  const response = await fetch(URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Error when deleting author')
  }
  const data = await response.json()
  return data
})

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
  }
})

export const { addAuthor, updateAuthor, removeAuthor } = authorSlice.actions

export default authorSlice.reducer
