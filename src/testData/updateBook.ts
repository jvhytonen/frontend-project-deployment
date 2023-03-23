import { Book } from '../features/book/bookSlice'

// Data for manually testing redux before creating UI. Will be deleted once UI is ready.
// Testing adding a new book.

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
