import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import './App.css'
import { decrement, increment } from './features/counter/counterSlice'
import { AppDispatch, RootState } from './store'
import { fetchBooks } from './features/book/bookSlice'
import { GoogleLogin } from '@react-oauth/google'

function App() {
  const count = useSelector((state: RootState) => state.counter.value)
  const book = useSelector((state: RootState) => state.book.items)
  // const author = useSelector((state: RootState) => state.)
  const dispatch = useDispatch<AppDispatch>()

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
        <button onClick={() => dispatch(fetchBooks('http://localhost:5173/authors.json'))}>
          Fetch authors
        </button>
        <ul>
          {book !== null
            ? book.map((item) => {
                return <li key={item.ISBN}>{item.ISBN}</li>
              })
            : null}
        </ul>
      </div>
    </div>
  )
}

export default App
