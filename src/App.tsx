import { useDispatch, useSelector } from 'react-redux'
import { GoogleLogin } from '@react-oauth/google'

import './App.css'
import { decrement, increment } from './features/counter/counterSlice'
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
  const count = useSelector((state: RootState) => state.counter.value)
  const book = useSelector((state: RootState) => state.book.items)
  const author = useSelector((state: RootState) => state.author.items)
  const dispatch = useDispatch<AppDispatch>()

  const deleteBookHandler: (e: number) => void = (e) => {
    dispatch(deleteBook(e))
  }
  const updateBookHandler: (e: number) => void = (e) => {
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
  const updateAuthorHandler: (e: number) => void = (e) => {
    dispatch(updateAuthor(updatedAuthor))
  }
  return (
    <div className="App">
      <h1>Vite + React + Toolkit + Tailwind</h1>
      <h2>Library will be build here</h2>
      <div className="card">
        <button onClick={() => dispatch(increment())}>Increment</button>
        <span className="px-10">{count}</span>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse)
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
        <button onClick={() => dispatch(fetchBooks('http://localhost:5173/books.json'))}>
          Fetch books
        </button>
        <button onClick={() => dispatch(fetchAuthors('http://localhost:5173/authors.json'))}>
          Fetch authors
        </button>
        <button onClick={() => dispatch(addBook(newBook))}>
          Add Juhani Aho`&apos;`s book to the list.
        </button>
        <button onClick={() => updateBookHandler(0)}>
          Update Seven brothers to `&rdquo;`Seitsemän veljestä`&rdquo;`
        </button>
        {book !== null && !book[0].isBorrowed ? (
          <button onClick={() => borrowBookHandler()}>Borrow Seven brothers</button>
        ) : (
          <button onClick={() => returnBookHandler()}>Return Seven brothers</button>
        )}
        <ul>
          {book !== null
            ? book.map((item) => {
                return (
                  <li onClick={() => deleteBookHandler(item.id)} key={item.ISBN}>
                    {item.title}: {item.ISBN} {item.isBorrowed ? 'Borrowed' : 'Free'} Returned:
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
        <button onClick={() => dispatch(addAuthor(newAuthor))}>
          Add Juhani Aho on the author-list
        </button>
        <button onClick={() => updateAuthorHandler(0)}>Make Väinö Linna a legend!</button>
      </div>
    </div>
  )
}

export default App
