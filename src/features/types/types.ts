import { ChangeEvent, MouseEventHandler } from 'react'

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

export type PartialPersistedState = Partial<{
  book: BookState
  author: AuthorState
  user: UserState
  copy: CopyState
  category: CategoryState
}>

export type Category = {
  id?: string
  name: string
}

export type Author = {
  id?: string
  name: string
  description: string
}

export type AuthorState = {
  items: Author[] | null
  isLoading: boolean
  error: null | string
  showSuccessModal: boolean
}

export type Borrow = {
  userId: string
  copyId: string
}

export type BookIntroType = Partial<Book>

export type HandleClick = () => void
export type HandleAuthorClick = (id: number) => void

export type ButtonType = {
  label: string
  handleClick: MouseEventHandler<HTMLButtonElement>
}

export type User = {
  id: string
  username: string
  role: 'USER' | 'ADMIN' | null
}

export type NewUser = Omit<User, 'id'>
export type Credentials = {
  username: string
  password: string
}

export type Checkout = {
  id: string
  startTime: string
  endTime: string
  user: User
  returned: boolean
}

export type CopyState = {
  items: Copy[] | null
  isLoading: boolean
  error: string | null
}

export type Copy = {
  copyId: string
  book: Book
  latestCheckout: Checkout
}
export type NewCopy = {
  bookId: string
}

export type CheckoutHandler = {
  copyId: string
  userId: string
}
export type CategoryState = {
  items: Category[] | null
  isLoading: boolean
  error: string | null
}

export type ModalType = {
  heading: string
  text: string
  close: () => void
}

export type InputItemType = {
  fieldName: string
  name: string
  type: string
  placeholder: string
  labelText: string
  value?: string
  handleChange: (event: ChangeEvent<FormElement>) => void
}

export type OptionItemType = {
  fieldName: string
  placeholder: string
  name: string
  defaultValue?: string
  items: Author[] | Category[]
  onChange: (event: ChangeEvent<FormElement>) => void
}

export type TextAreaType = {
  fieldName: string
  labelText: string
  defaultValue?: string
  placeholder: string
  handleChange: (event: ChangeEvent<FormElement>) => void
}

export type UploadImageType = {
  onImageUpload: (file: File, fileName: string) => void
}
// All form elements neede to add or change data
export type FormElement = HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement

export type NavbarLinkType = {
  link: string
  label: string
}

export type TableHeadingType = {
  label: string
}

export type ValidateBookType = {
  title: string
  authorId: string
  categoryId: string
  isbn: string
  yearPublished: string
  description: string
  publisher: string
}

export type Token = string

// Types when sending data to server

export interface CategoryPostRequest {
  token: Token
  data: Category
}
export interface CategoryDeleteRequest {
  id: string
  token: Token
}
export interface AuthorPostRequest {
  token: Token
  data: Author
}
export interface AuthorDeleteRequest {
  id: string
  token: Token
}
export interface BookPostRequest {
  token: Token
  data: Book
  coverImage: File | null
}
