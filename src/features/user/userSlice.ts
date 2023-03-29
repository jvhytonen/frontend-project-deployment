import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type LoginCredentialType = {
  name: string
  email: string
  isAdmin: boolean
  sub: string
}

export type LoginSuccessType = {
  name: string
  email: string
  isAdmin: boolean
  id: number
}

type UserState = {
  name: string | null
  email: string | null
  isAdmin: boolean
  id: null | number
}

const initialState: UserState = {
  name: null,
  email: null,
  isAdmin: false,
  id: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginSuccessType>) => {
      state.name = action.payload.name
      state.isAdmin = action.payload.isAdmin
      state.email = action.payload.email
      state.id = action.payload.id
    },
    logUserOut: (state) => {
      state.name = null
      state.isAdmin = false
      state.email = null
      state.id = null
    }
  }
})

export const { loginSuccess, logUserOut } = userSlice.actions

export default userSlice.reducer
