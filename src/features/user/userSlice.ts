import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData } from '../fetchAPI/fetchAPI'
import { User } from '../types/types'

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

export const getUser = createAsyncThunk('users/fetch', async (id: string) => {
  const URL = 'http://localhost:8081/api/v1/users/' + id
  const response = fetchData(URL)
  return response
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logUserIn: (state, action: PayloadAction<LoginTry>) => {
      console.log('Login')
    },
    logUserOut: (state) => {
      console.log('logout')
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getUser.rejected, (state) => {
      state.error = 'An error occurred! Try again later'
    })
  }
})

export const { logUserIn, logUserOut } = userSlice.actions

export default userSlice.reducer
