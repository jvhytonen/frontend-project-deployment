import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AuthState, User, UserState } from '../types/reduxTypes'
import jwtDecode from 'jwt-decode'
import { API_BASE_URL } from '../utils/variables'
import { Credentials, SignUpData } from '../types/actionTypes'

const SIGNINURL = API_BASE_URL + 'signin'
const SIGNUPURL = API_BASE_URL + 'signup'

const initialUser: User = {
  id: '',
  name: '',
  username: '',
  role: null
}

const initialState: AuthState = {
  token: null,
  items: initialUser,
  isLoading: false,
  error: null
}

export const login = createAsyncThunk('login', async (credentials: Credentials, thunkAPI) => {
  try {
    const response = await fetch(SIGNINURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    const data = await response.text()
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const signUp = createAsyncThunk('signup', async (request: SignUpData, thunkAPI) => {
  try {
    const response = await fetch(SIGNUPURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
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
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false
      console.log(action.payload)
    })
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false
      state.error = 'An error occured'
    })
  }
})

export const { logUserOut } = authSlice.actions

export default authSlice.reducer
