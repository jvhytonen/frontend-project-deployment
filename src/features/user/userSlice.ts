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
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginSuccessType>) => {
      state.name = action.payload.name
      state.userType = isOnTheWhitelist(action.payload.email) ? 'admin' : 'user'
      state.email = action.payload.email
      state.id = action.payload.id
    },
    logUserOut: (state) => {
      state.name = null
      state.userType = null
      state.email = null
      state.id = null
    }
  }
})

export const { loginSuccess, logUserOut } = userSlice.actions

export default userSlice.reducer
