// Items:

export type Book = {
  id?: string
  isbn: string
  title: string
  imageUrl: string | null
  author: Author
  authorId?: string
  category: Category
  categoryId?: string
  description: string
  publisher: string
  yearPublished: string
}

export type Category = {
  id?: string
  name: string
}

export type Author = {
  id: string
  name: string
  description: string
}

export type Checkout = {
  id: string
  startTime: string
  endTime: string
  user: User
  returned: boolean
}

export type Copy = {
  bookCopyId: string
  latestCheckout: null | Checkout
}

export type NewCopy = {
  bookId: string
}

export type User = {
  id: string
  username: string
  role: 'USER' | 'ADMIN' | null
}

export type NewUser = Omit<User, 'id'>

// Redux states

export interface ErrorState {
  error: string | null
}

export interface IsLoadingState {
  isLoading: boolean
}

export type BookState = {
  items: Book[] | null
  isLoading: boolean
  error: null | string
}

export type UserState = {
  token: string | null
  items: User
  isLoading: boolean
  error: null | string
}

export type AuthorState = {
  items: Author[] | null
  isLoading: boolean
  error: null | string
}

export type CopyState = {
  items: Copy[] | null
  isLoading: boolean
  error: string | null
}

export type CategoryState = {
  items: Category[] | null
  isLoading: boolean
  error: string | null
}

export type ModalState = {
  text: string | null
  status: null | 'waitingConfirmation' | 'confirmed' | 'finished' | 'error' | 'confirm' | 'success'
}

export type SearchQueryState = {
  query: string
  page: number
}

// For the Redux persist to store data even when the browser is refreshed:

export type PartialPersistedState = Partial<{
  book: BookState
  author: AuthorState
  user: UserState
  copy: CopyState
  category: CategoryState
}>
