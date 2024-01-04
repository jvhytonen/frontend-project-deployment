import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { API_BASE_URL } from '../utils/variables'
import { User, UserState } from '../types/reduxTypes'
import { getItemWithAuth } from '../utils/fetchAPI'

const initialUsers: User[] = [
  {
    id: '',
    name: '',
    username: '',
    role: null
  }
]

const initialState: UserState = {
  token: null,
  items: initialUsers,
  isLoading: false,
  error: null
}

export const getAllUsers = createAsyncThunk('users/getAll', async (token: string) => {
  const request = {
    url: API_BASE_URL + 'users/',
    token: token
  }
  const response = await getItemWithAuth(request)
  return response
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    nullifyUserError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllUsers.rejected, (state) => {
      state.error = 'An error occurred! Try again later'
    })
  }
})

export const { nullifyUserError } = userSlice.actions

export default userSlice.reducer
