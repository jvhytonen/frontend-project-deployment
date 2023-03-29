import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import { AppDispatch } from './store'
import Header from './components/Header/Header'
import { fetchBooks } from './features/book/bookSlice'
import { fetchAuthors } from './features/author/authorSlice'
import Login from './components/Login/Login'
import Books from './components/Books/Books'
import Authors from './components/Authors/Authors'
import Logout from './components/Logout/Logout'
import Home from './components/Home/Home'
import AuthorForm from './components/AuthorForm/AuthorForm'
import BookForm from './components/AddBook/AddBook'
import BookDetails from './components/BookDetails/BookDetails'
import AuthorDetails from './components/AuthorDetails/AuthorDetails'
import EditBook from './components/EditBook/EditBook'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchBooks())
    dispatch(fetchAuthors())
  }, [])

  return (
    <div className="App w-full">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="author-form" element={<AuthorForm />} />
        <Route path="book-form" element={<BookForm />} />
        <Route path="books/:id" element={<BookDetails />} />
        <Route path="authors/:id" element={<AuthorDetails />} />
        <Route path="edit/:isbn" element={<EditBook />} />
      </Routes>
    </div>
  )
}

export default App
