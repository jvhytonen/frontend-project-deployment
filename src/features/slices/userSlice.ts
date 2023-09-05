import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData } from '../fetchAPI/fetchAPI'
import jwtDecode from 'jwt-decode'
import { User, UserState } from '../types/reduxTypes'

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

export const getUsers = createAsyncThunk('users/fetch', async (id: string) => {
  const URL = 'http://localhost:8081/api/v1/users/' + id
  const response = fetchData(URL)
  return response
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<User>) => {
      console.log('Login')
    },
    nullifyUserError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getUsers.rejected, (state) => {
      state.error = 'An error occurred! Try again later'
    })
  }
})

export const { getUser, nullifyUserError } = userSlice.actions

export default userSlice.reducer
