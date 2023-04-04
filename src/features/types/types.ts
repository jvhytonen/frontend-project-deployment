import { MouseEventHandler } from 'react'

export type Book = {
  id: number
  ISBN: number
  title: string
  url: string
  description: string
  publisher: string
  authors: string
  isBorrowed: boolean
  borrowerId: number | null
  published: number
  borrowDate: Date | null
  returnDate: Date | null
}
export type BookState = {
  items: Book[] | null
  isLoading: boolean
  error: null | string
}

export type Author = {
  id: number
  name: string
  description: string
}

export type AuthorState = {
  items: Author[] | null
  isLoading: boolean
  error: null | string
}

export type AddAuthorType = Omit<Author, 'id'>

export type BorrowBook = Omit<
  Book,
  'ISBN' | 'title' | 'url' | 'description' | 'publisher' | 'authors' | 'published' | 'isBorrowed'
>

export type ReturnBook = {
  bookId: number
}

export type AddNewBookType = Omit<
  Book,
  'id' | 'isBorrowed' | 'borrowerId' | 'borrowDate' | 'returnDate'
>
export type BookIntroType = Partial<Book>

export type HandleClick = () => void
export type HandleAuthorClick = (id: number) => void

export type ButtonType = {
  label: string
  handleClick: MouseEventHandler<HTMLButtonElement>
}
