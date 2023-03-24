import { Book } from '../features/book/bookSlice'
import { Author } from '../features/author/authorSlice'

// Data for manually testing redux before creating UI. Will be deleted once UI is ready.
// Testing adding a new book.

export const newBook: Book = {
  id: 3,
  ISBN: 9510283355,
  title: 'The Railroad',
  description: 'A tale of an old man and an old woman who had never seen a train before',
  publisher: 'Gummerrus',
  authors: 'Juhani Aho',
  isBorrowed: false,
  borrowerId: null,
  published: 1892,
  borrowDate: null,
  returnDate: null
}

// Testing updating book data.

export const updatedBook: Book = {
  id: 0,
  ISBN: 9789517179720,
  title: 'Seitsemän veljestä',
  description: 'A story about seven brothers and their life',
  publisher: 'SKS',
  authors: 'Aleksis Kivi',
  isBorrowed: false,
  borrowerId: null,
  published: 1870,
  borrowDate: null,
  returnDate: null
}

// Testing borrowing and returning a book.

export const borrowTest: BorrowTest = {
  bookId: 0,
  borrowerId: 12
}

export type BorrowTest = {
  bookId: number
  borrowerId: number
}

export const newAuthor: Author = {
  id: 3,
  name: 'Mark Twain',
  description: 'Wrore about life along Mississippi river'
}

export const updatedAuthor: Author = {
  id: 0,
  name: 'Väinö Linna',
  description: 'A true legend!'
}
