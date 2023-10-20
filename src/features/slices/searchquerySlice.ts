import { createSlice } from '@reduxjs/toolkit'
import { SearchQueryState } from '../types/reduxTypes'

const initialState: SearchQueryState = {
  query: '',
  page: 1
}

export const searchQuerySlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
    setText: (state, action) => {
      state.query = action.payload
    },
    setInitialState: (state) => {
      state = initialState
    }
  }
})

export const { setPage, setText } = searchQuerySlice.actions
export default searchQuerySlice.reducer
