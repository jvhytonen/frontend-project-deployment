import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData } from '../fetchAPI/fetchAPI'
import { User, Credentials } from '../types/types'
import jwtDecode from 'jwt-decode'

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
  token: string | null
  items: User
  isLoading: boolean
  error: null | string
}

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

export const login = createAsyncThunk('users/login', async (credentials: Credentials) => {
  const URL = 'http://localhost:8081/api/v1/signin'
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  if (!response.ok) {
    throw new Error('Error with signup!')
  }
  const data = await response.text()
  console.log(data)
  return data
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
      ;(state.token = null), (state.items = initialUser)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.token = action.payload
      // Adding data to the user object from the token.
      const userData = decodeToken(action.payload)
      if (userData) {
        state.items.username = userData.username
        state.items.role = userData.role
      }
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
