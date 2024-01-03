import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { NewUser, SignUpState } from '../types/reduxTypes'

const URL = 'e'
const initialUser: NewUser = {
  name: '',
  username: '',
  role: null
}

const initialState: SignUpState = {
  token: null,
  items: initialUser,
  isLoading: false,
  error: null
}

export const signUpUser = createAsyncThunk('users/signup', async (user: NewUser) => {
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
  reducers: {},
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

export default signUpSlice.reducer
