import { ChangeEvent, MouseEventHandler } from 'react'

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

export type User = {
  id: string
  username: string
  role: 'USER' | 'ADMIN' | null
}

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

// For the Redux persist to store data even when the browser is refreshed:

export type PartialPersistedState = Partial<{
  book: BookState
  author: AuthorState
  user: UserState
  copy: CopyState
  category: CategoryState
}>

export type Borrow = {
  userId: string
  copyId: string
}

export type BookIntroType = Partial<Book>

export type HandleClick = () => void
export type HandleAuthorClick = (id: number) => void

export type NewUser = Omit<User, 'id'>
export type Credentials = {
  username: string
  password: string
}

export type NewCopy = {
  bookId: string
}

export type CheckoutBorrow = {
  copyId: string
  userId: string
}

export type CheckoutReturn = {
  checkoutId: string
  copyId: string
  userId: string
}

//Forms:

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

// All form elements needed to add or change data
export type FormElement = HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement

// Components:

export type ButtonType = {
  label: string
  type: 'neutral' | 'confirm' | 'cancel' | 'delete' | 'edit'
  handleClick: MouseEventHandler<HTMLButtonElement>
}

export interface DeleteAuthorType {
  authorId: string
  authorName: string
}

export type NavbarLinkType = {
  link: string
  label: string
}

export interface TableProps {
  children: React.ReactNode
}

export type TableHeadingType = {
  label: string
}

export interface AdminTableProps {
  headers: string[]
  rows: React.ReactNode[]
}

export type Modal = {
  type: string
  heading: string
  message: string
}

export type ModalProps = {
  heading: string
  text: string
  type: 'waitingConfirmation' | 'confirmed' | 'finished' | 'error' | 'confirm' | 'success'
  onConfirm: () => void
  onCancel?: () => void
}

export interface CopyProps {
  copyOrderNumber: number
  copy: Copy
  onCheckout: (checkoutObj: Copy, actionType: CheckoutActionType) => void
}

export type CopyPropsNoAuth = Omit<CopyProps, 'onCheckout'>

export interface CopiesProps {
  bookId: string
}

export interface BorrowProps {
  copyId: string
}

export interface ReturnProps {
  copyId: string
  checkoutId: string
}

// Helpers:

export type ValidateBookType = {
  title: string
  authorId: string
  categoryId: string
  isbn: string
  yearPublished: string
  description: string
  publisher: string
}

// Action type

export type CheckoutActionType = 'borrow' | 'return'

// Requests to the server:

export type Token = string

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
export interface CheckoutRequest {
  token: Token
  data: CheckoutBorrow | CheckoutReturn
}
export interface DeleteRequest {
  url: string
  token: Token
}
export interface PostRequest {
  url: string
  token: Token
  body: Category | Author | Book | User | NewCopy | CheckoutBorrow | CheckoutReturn
}
export interface BookDeleteRequest {
  id: string
  token: Token
}

export interface CopyPostRequest {
  token: Token
  bookId: string
}

export interface CopyDeleteRequest {
  token: Token
  id: string
}

export interface GetRequestWithAuth {
  url: string
  token: Token
}

export type GetRequestWithoutAuth = Omit<GetRequestWithAuth, 'token'>
