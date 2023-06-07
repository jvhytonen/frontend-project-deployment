import { configureStore } from '@reduxjs/toolkit'

import bookReducer from './features/book/bookSlice'
import authorSlice from './features/author/authorSlice'
import userSlice from './features/user/userSlice'
import copySlice from './features/copy/copySlice'
import categorySlice from './features/category/categorySlice'

export const store = configureStore({
  reducer: {
    book: bookReducer,
    author: authorSlice,
    user: userSlice,
    copy: copySlice,
    category: categorySlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
