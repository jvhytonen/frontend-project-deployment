import { useDispatch, useSelector } from 'react-redux'

import './App.css'
import { AppDispatch, RootState } from './store'
import {
  borrowBook,
  fetchBooks,
  updateBook,
  deleteBook,
  addBook,
  returnBook
} from './features/book/bookSlice'
import { fetchAuthors, addAuthor, updateAuthor, deleteAuthor } from './features/author/authorSlice'
import {
  newBook,
  updatedBook,
  borrowTest,
  newAuthor,
  updatedAuthor
} from './testData/testVariables'

function App() {
  const book = useSelector((state: RootState) => state.book.items)
  const author = useSelector((state: RootState) => state.author.items)
  const dispatch = useDispatch<AppDispatch>()

  const deleteBookHandler: (e: number) => void = (e) => {
    dispatch(deleteBook(e))
  }
  const updateBookHandler: () => void = () => {
    if (book !== null) {
      dispatch(updateBook(updatedBook))
    }
  }
  const borrowBookHandler: () => void = () => {
    dispatch(borrowBook(borrowTest))
  }
  const returnBookHandler: () => void = () => {
    dispatch(returnBook(borrowTest))
  }
  const deleteAuthorHandler: (e: number) => void = (e) => {
    dispatch(deleteAuthor(e))
  }
  const updateAuthorHandler: () => void = () => {
    dispatch(updateAuthor(updatedAuthor))
  }
  return (
    <div className="App">
      <h1>Library app will be build here</h1>
      <p>Buttons below are to test Redux. You can remove author or book by clicking on it.</p>
      <div className="card">
        <div>
          <button onClick={() => dispatch(fetchBooks('http://localhost:5173/books.json'))}>
            Fetch books
          </button>
          <button onClick={() => dispatch(fetchAuthors('http://localhost:5173/authors.json'))}>
            Fetch authors
          </button>
        </div>
        {book ? (
          <div>
            <button onClick={() => dispatch(addBook(newBook))}>
              Add Juhani Aho`&apos;`s book to the list.
            </button>
            <button onClick={() => updateBookHandler()}>
              Update Seven brothers to `&rdquo;`Seitsemän veljestä`&rdquo;`
            </button>{' '}
          </div>
        ) : null}
        {book !== null ? (
          <div>
            {!book[0].isBorrowed ? (
              <button onClick={() => borrowBookHandler()}>Borrow Seven brothers</button>
            ) : null}
            {book[0].isBorrowed ? (
              <button onClick={() => returnBookHandler()}>Return Seven brothers</button>
            ) : null}
          </div>
        ) : null}

        <ul>
          {book !== null
            ? book.map((item) => {
                return (
                  <li onClick={() => deleteBookHandler(item.id)} key={item.ISBN}>
                    {item.title}: {item.ISBN} {item.isBorrowed ? 'Borrowed. Return date: ' : 'Free'}
                    {item.isBorrowed && item.returnDate !== null
                      ? new Date(item.returnDate).toDateString()
                      : null}
                  </li>
                )
              })
            : null}
        </ul>
        <ul>
          {author !== null
            ? author.map((item) => {
                return (
                  <li onClick={() => deleteAuthorHandler(item.id)} key={item.id}>
                    {item.name}: {item.description}
                  </li>
                )
              })
            : null}
        </ul>
        {author ? (
          <div>
            <button onClick={() => dispatch(addAuthor(newAuthor))}>
              Add Mark Twain on the author-list
            </button>
            <button onClick={() => updateAuthorHandler()}>
              Make Väinö Linnas description to be a legend!
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default App
