import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData } from '../fetchAPI/fetchAPI'
import { User, Credentials, UserState } from '../types/types'
import jwtDecode from 'jwt-decode'
import { apiErrorHandler } from '../utils/errors'

const initialUser: User = {
  id: '',
  username: '',
  role: null
}

const initialState: UserState = {
  token: null,
  items: initialUser,
  loading: null,
  error: null
}

export const login = createAsyncThunk('login', async (credentials: Credentials, thunkAPI) => {
  const URL = 'http://localhost:8081/api/v1/signin'
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    await apiErrorHandler(response)
    const data = await response.text()
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const decodeToken = (token: string) => {
  try {
    const decodedToken: any = jwtDecode(token)
    return {
      username: decodedToken.username,
      id: decodedToken.user_id,
      role: decodedToken.role
    }
  } catch (error) {
    return null
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logUserOut: (state) => {
      state.items = initialUser
      state.token = null
    },
    nullifyAuthError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = 'completed'
      state.token = action.payload
      // Adding data to the user object from the token.
      const userData = decodeToken(action.payload)
      if (userData) {
        state.items.username = userData.username
        state.items.role = userData.role
      }
    })
    builder.addCase(login.pending, (state) => {
      state.loading = 'loading'
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = 'completed'
      state.error = 'Check your username and password!'
    })
  }
})

export const { logUserOut, nullifyAuthError } = authSlice.actions

export default authSlice.reducer
