import { configureStore } from '@reduxjs/toolkit'

import bookReducer from './features/slices/bookSlice'
import authorSlice from './features/slices/authorSlice'
import userSlice from './features/slices/userSlice'
import copySlice from './features/slices/copySlice'
import categorySlice from './features/slices/categorySlice'

export const store = configureStore({
  reducer: {
    book: bookReducer,
    author: authorSlice,
    user: userSlice,
    copy: copySlice,
    category: categorySlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
