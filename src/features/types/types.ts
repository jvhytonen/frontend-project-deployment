import { ChangeEvent, MouseEventHandler } from 'react'

export type Book = {
  id: string
  isbn: string
  title: string
  url: string
  imageUrl: string
  author: Author[]
  category: Category[]
  description: string
  publisher: string
  yearPublished: number
}
export type BookState = {
  items: Book[] | null
  isLoading: boolean
  error: null | string
}

export type Category = {
  id: string
  name: string
}

export type Author = {
  id: string
  name: string
  description: string
}

export type AuthorState = {
  items: Author[] | null
  isLoading: boolean
  error: null | string
  showSuccessModal: boolean
}

export type AddAuthorType = Omit<Author, 'id'>
export type AddCategoryType = Omit<Author, 'id'>

export type Borrow = {
  userId: string
  copyId: string
}

export type AddNewBookType = {
  categoryId: string
  authorId: string
  isbn: string
  imageUrl: string
  title: string
  yearPublished: number
  description: string
  publisher: string
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
  name: string
  email: string
  role: 'USER' | 'ADMIN'
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
export type NewCategory = {
  name: string
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
  handleChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => void
}
export type NavbarLinkType = {
  link: string
  label: string
}
