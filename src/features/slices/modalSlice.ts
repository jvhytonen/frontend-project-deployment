import { createSlice } from '@reduxjs/toolkit'
import { ModalState } from '../types/reduxTypes'

const initialState: ModalState = {
  isOpen: false,
  heading: null,
  content: null,
  type: null
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.heading = action.payload.heading
      state.content = action.payload.content
      state.type = 'confirm'
    },
    openErrorModal: (state, action) => {
      state.isOpen = true
      state.heading = action.payload.heading
      state.content = action.payload.content
      state.type = 'error'
    },
    closeModal: (state) => {
      state.isOpen = false
      state.heading = null
      state.content = null
      state.type = null
    },
    confirm: (state) => {
      state.isOpen = false
      state.content = null
      state.type = 'confirmed'
    },
    finished: (state, action) => {
      state.isOpen = true
      state.heading = action.payload.heading
      state.content = action.payload.content
      state.type = 'finished'
    }
  }
})

export const { openModal, openErrorModal, closeModal, confirm, finished } = modalSlice.actions
export default modalSlice.reducer
