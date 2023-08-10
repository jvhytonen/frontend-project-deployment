import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchData } from '../fetchAPI/fetchAPI'
import { Book, BookState, BookPostRequest, BookDeleteRequest } from '../types/types'
import { deleteItem } from '../utils/thunks'

const APIURL = 'http://localhost:8081/api/v1/books/'

const initialState: BookState = {
  items: null,
  isLoading: false,
  error: null
}

export const getAllBooks = createAsyncThunk('books/getAll', async () => {
  const URL = 'http://localhost:8081/api/v1/books/'
  const response = fetchData(APIURL)
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
  /*   if (newBookReq.coverImage) {
    const imageUpload = await uploadImage(newBookReq.coverImage)
    console.log(imageUpload)
  } */
  const URL = 'http://localhost:8081/api/v1/books/'
  const response = await fetch(APIURL, {
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

export const updateBook = createAsyncThunk('books/update', async (updateReq: BookPostRequest) => {
  const URL = APIURL + updateReq.data.id
  const response = await fetch(URL, {
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
})

export const deleteBook = createAsyncThunk('books/delete', async (request: BookDeleteRequest) => {
  const URL = 'http://localhost:8081/api/v1/books/' + request.id
  const req = {
    url: URL,
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
  }
})

export const { nullifyBookError } = bookSlice.actions

export default bookSlice.reducer
