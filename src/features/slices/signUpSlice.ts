import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { NewUser, User, UserState } from '../types/types'
//import { API_BASE_URL } from '../../../src/vite-env.e'

//const URL = process.env.API_BASE_URL + 'signup'
const URL = 'e'
const initialUser: User = {
  id: '',
  username: '',
  role: null
}

const initialState: UserState = {
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

//export const {} = signUpSlice.actions

export default signUpSlice.reducer
