import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { deleteItem, getItemNoAuth } from '../utils/thunks'
import { API_BASE_URL } from '../utils/variables'
import { Book, BookState } from '../types/reduxTypes'
import { BookDeleteRequest, BookPostRequest } from '../types/requestTypes'

const URL = API_BASE_URL + 'books/'
const IMAGEUPLOADURL = API_BASE_URL + 'images/upload/'

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

export const uploadImage = createAsyncThunk('images/upload', async (file: File) => {
  // First version of the image upload that works
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(IMAGEUPLOADURL, {
      method: 'POST',
      headers: {
        //'Content-Type': 'multipart/form-data'
        // eslint-disable-next-line prettier/prettier
        //  'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    if (response.ok) {
      const result = await response.text()
      console.log('Image uploaded successfully:', result)
    } else {
      const error = await response.text()
      console.error('Image upload failed:', error)
    }
  } catch (error) {
    console.error('Error:', error)
  }
})

export const addNewBook = createAsyncThunk('books/add', async (newBookReq: BookPostRequest) => {
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
