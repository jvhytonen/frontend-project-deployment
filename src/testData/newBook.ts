import { Book } from '../features/book/bookSlice'

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
