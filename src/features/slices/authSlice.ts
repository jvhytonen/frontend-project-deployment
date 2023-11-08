import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User, UserState } from '../types/reduxTypes'
import jwtDecode from 'jwt-decode'
import { API_BASE_URL } from '../utils/variables'
import { Credentials } from '../types/actionTypes'

const URL = API_BASE_URL + 'signin'

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

export const login = createAsyncThunk('login', async (credentials: Credentials, thunkAPI) => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    const data = await response.text()
    console.log(data)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
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
      state.isLoading = false
      state.token = action.payload
      // Adding data to the user object from the token.
      const userData = decodeToken(action.payload)
      if (userData) {
        state.items.id = userData.id
        state.items.username = userData.username
        state.items.role = userData.role
      }
    })
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.error = 'Check your username and password!'
    })
  }
})

export const { logUserOut, nullifyAuthError } = authSlice.actions

export default authSlice.reducer
