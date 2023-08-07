import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { NewUser, User } from '../types/types'

export type LoginCredentialType = {
  name: string
  email: string
  isAdmin: boolean
  sub: string
}

export type LoginTry = {
  id: string
}

type UserState = {
  items: User | null
  isLoading: boolean
  error: null | string
}

const initialState: UserState = {
  items: null,
  isLoading: false,
  error: null
}

export const signUpUser = createAsyncThunk('users/signup', async (user: NewUser) => {
  const URL = 'http://localhost:8081/api/v1/signup'
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  if (!response.ok) {
    throw new Error('Error with signup!')
  }
  const data = await response.json()
  return data
})

export const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    nullifyCategoryError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(signUpUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signUpUser.rejected, (state) => {
      state.error = 'An error occurred! Try again later'
    })
  }
})

export const { signUpUser } = signUpSlice.actions

export default signUpSlice.reducer
