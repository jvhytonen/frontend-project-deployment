import { useDispatch, useSelector } from 'react-redux'

import './App.css'
import { decrement, increment } from './features/counter/counterSlice'
import { AppDispatch, RootState } from './store'
import { fetchBooks, updateBook } from './features/book/bookSlice'
import { fetchAuthors } from './features/author/authorSlice'
import { GoogleLogin } from '@react-oauth/google'
import { Book, deleteBook, addBook } from './features/book/bookSlice'
import { newBook } from './testData/newBook/newBook'

function App() {
  const count = useSelector((state: RootState) => state.counter.value)
  const book = useSelector((state: RootState) => state.book.items)
  const author = useSelector((state: RootState) => state.author.items)
  const dispatch = useDispatch<AppDispatch>()

  const deleteBookHandler: (e: number) => void = (e) => {
    dispatch(deleteBook(e))
  }
  const updateBookHandler: (e: number) => void = (e) => {
    const updatedItem: Book = {
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
    if (book !== null) {
      dispatch(updateBook(updatedItem))
    }
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
        <ul>
          {book !== null
            ? book.map((item) => {
                return (
                  <li onClick={() => deleteBookHandler(item.id)} key={item.ISBN}>
                    {item.title}: {item.ISBN}
                  </li>
                )
              })
            : null}
        </ul>
        <ul>
          {author !== null
            ? author.map((item) => {
                return (
                  <li key={item.id}>
                    {item.name}: {item.description}
                  </li>
                )
              })
            : null}
        </ul>
      </div>
    </div>
  )
}

export default App
