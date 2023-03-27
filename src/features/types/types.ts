export type Book = {
  id: number
  ISBN: number
  title: string
  description: string
  publisher: string
  authors: string
  isBorrowed: boolean
  borrowerId: number | null
  published: number
  borrowDate: string | null
  returnDate: number | null
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

export type BorrowBook = {
  bookId: number
  borrowerId: number
}

export type ReturnBook = {
  bookId: number
}
