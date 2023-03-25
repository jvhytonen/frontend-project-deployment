import { configureStore } from '@reduxjs/toolkit'

import bookReducer from './features/book/bookSlice'
import authorSlice from './features/author/authorSlice'
import userSlice from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    book: bookReducer,
    author: authorSlice,
    user: userSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
