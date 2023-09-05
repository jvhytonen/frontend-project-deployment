import { createSlice } from '@reduxjs/toolkit'
import { ModalState } from '../types/reduxTypes'

const initialState: ModalState = {
  text: null,
  status: null
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    resetModal: (state) => {
      state.text = null
      state.status = null
    },
    askConfirmation: (state, action) => {
      state.text = action.payload
      state.status = 'waitingConfirmation'
    },
    confirm: (state) => {
      state.text = null
      state.status = 'confirmed'
    },
    finished: (state, action) => {
      state.text = action.payload
      state.status = 'finished'
    }
  }
})

export const { resetModal, askConfirmation, confirm, finished } = modalSlice.actions
export default modalSlice.reducer
