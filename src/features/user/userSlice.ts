import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { isOnTheWhitelist } from '../whitelist/whitelist'

export type LoginCredentialType = {
  name: string
  email: string
  sub: string
}

export type LoginSuccessType = {
  name: string
  email: string
  id: number
}

type UserState = {
  name: string | null
  email: string | null
  userType: 'admin' | 'user' | null
  id: null | number
}

const initialState: UserState = {
  name: null,
  email: null,
  userType: null,
  id: null
}

export const userSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginSuccessType>) => {
      state.name = action.payload.name
      state.userType = isOnTheWhitelist(action.payload.email) ? 'admin' : 'user'
      state.email = action.payload.email
    }
  }
})

export const { loginSuccess } = userSlice.actions

export default userSlice.reducer
