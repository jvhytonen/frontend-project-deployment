import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Book, BookState, BookPostRequest, BookDeleteRequest } from '../types/types'
import { deleteItem, getItemNoAuth } from '../utils/thunks'
import { API_BASE_URL } from '../../../src/vite-env.e'

const URL = API_BASE_URL + 'books/'

const initialState: BookState = {
  items: null,
  isLoading: false,
  error: null
}

export const getAllBooks = createAsyncThunk('books/getAll', async () => {
  const req = {
    url: URL
  }
  const response = await getItemNoAuth(req)
  return response
})

const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('image', file)
  const URL =
    'https://erfv9p79ya.execute-api.eu-central-1.amazonaws.com/dev/upload-image-s3-jvh/' + file.name
  console.log(URL)
  const res = await fetch(URL, {
    method: 'PUT',
    body: formData
  })
  const response = res.json()
  return response
}

export const addNewBook = createAsyncThunk('books/add', async (newBookReq: BookPostRequest) => {
  // Uploading image still under construction
  /*   if (newBookReq.coverImage) {
    const imageUpload = await uploadImage(newBookReq.coverImage)
    console.log(imageUpload)
  } */
  const URL = 'http://localhost:8081/api/v1/books/'
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line prettier/prettier
      'Authorization': `Bearer ${newBookReq.token}`
    },
    body: JSON.stringify(newBookReq.data)
  })
  if (!response.ok) {
    throw new Error('Adding a book failed!')
  }
  const data = await response.json()
  return data
})

export const updateExistingBook = createAsyncThunk(
  'books/update',
  async (updateReq: BookPostRequest) => {
    const response = await fetch(URL + updateReq.data.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
      'Authorization': `Bearer ${updateReq.token}`
      },
      body: JSON.stringify(updateReq.data)
    })
    if (!response.ok) {
      throw new Error('Updating book failed!')
    }
    const data = await response.json()
    return data
  }
)

export const deleteBook = createAsyncThunk('books/delete', async (request: BookDeleteRequest) => {
  const req = {
    url: URL + request.id,
    token: request.token
  }
  const response = await deleteItem(req)
  return response
})
export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    nullifyBookError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBooks.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(getAllBooks.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllBooks.rejected, (state) => {
      state.error = 'An error occurred! Try again later'
    })
    builder.addCase(addNewBook.fulfilled, (state, action) => {
      state.isLoading = false
      if (state.items !== null) {
        state.items = [...state.items, action.payload]
      } else {
        state.items = [action.payload]
      }
    })
    builder.addCase(addNewBook.pending, (state) => {
      console.log('Loading')
    })

    builder.addCase(addNewBook.rejected, (state) => {
      state.error = 'Failed to add book'
    })
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = state.items?.filter((item) => action.payload.id !== item.id) as Book[]
    })
    builder.addCase(deleteBook.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message as string
    })
    builder.addCase(updateExistingBook.fulfilled, (state, action) => {
      state.isLoading = false
      console.log(action.payload)
    })
    builder.addCase(updateExistingBook.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateExistingBook.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
  }
})

export const { nullifyBookError } = bookSlice.actions

export default bookSlice.reducer
