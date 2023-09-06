import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers } from 'redux'

import bookReducer from './features/slices/bookSlice'
import authorSlice from './features/slices/authorSlice'
import userSlice from './features/slices/userSlice'
import copySlice from './features/slices/copySlice'
import categorySlice from './features/slices/categorySlice'
import authSlice from './features/slices/authSlice'
import modalSlice from './features/slices/modalSlice'
import {
  AuthorState,
  BookState,
  CategoryState,
  CopyState,
  ModalState,
  UserState
} from './features/types/reduxTypes'

export interface RootState {
  book: BookState
  author: AuthorState
  user: UserState
  copy: CopyState
  category: CategoryState
  auth: UserState
  modal: ModalState
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // auth is the reducer needed to persist.
}

const rootReducer = combineReducers<RootState>({
  book: bookReducer,
  author: authorSlice,
  user: userSlice,
  copy: copySlice,
  category: categorySlice,
  auth: authSlice,
  modal: modalSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
