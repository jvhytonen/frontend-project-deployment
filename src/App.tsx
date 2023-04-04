import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import { AppDispatch } from './store'
import { fetchBooks } from './features/book/bookSlice'
import { fetchAuthors } from './features/author/authorSlice'
import Login from './components/Login/Login'
import Books from './components/Books/Books'
import Authors from './components/Authors/Authors'
import Logout from './components/Logout/Logout'
import Home from './components/Home/Home'
import AddAuthor from './components/AddAuthor/AddAuthor'
import BookDetails from './components/BookDetails/BookDetails'
import EditBook from './components/EditBook/EditBook'
import AddBook from './components/AddBook/AddBook'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import EditAuthor from './components/EditAuthor/EditAuthor'
import Navbar from './components/Navbar/Navbar'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchBooks())
    dispatch(fetchAuthors())
  }, [])

  return (
    <div className="App w-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="books/:isbn" element={<BookDetails />} />
        <Route path="authors/add" element={<ProtectedRoute component={AddAuthor} />} />
        <Route path="authors/edit/:id" element={<ProtectedRoute component={EditAuthor} />} />
        <Route path="books/add" element={<ProtectedRoute component={AddBook} />} />
        <Route path="edit/:isbn" element={<ProtectedRoute component={EditBook} />} />
      </Routes>
    </div>
  )
}

export default App
