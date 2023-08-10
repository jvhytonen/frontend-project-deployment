import { Routes, Route } from 'react-router-dom'

import './App.css'
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
import AddCategory from './components/AddCategory/AddCategory'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import Signup from './components/Signup/Signup'
import EditCopy from './components/EditCopy/EditCopy'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'
import Modal from './components/Modal/Modal'
import { findError } from './features/utils/helpers'
import { nullifyCategoryError } from './features/slices/categorySlice'
import EditCategory from './components/EditCategory/EditCategory'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  // For the global error modal!
  const categoryErr = useSelector((state: RootState) => state.category)
  const bookErr = useSelector((state: RootState) => state.book)
  const authorErr = useSelector((state: RootState) => state.author)
  const copyErr = useSelector((state: RootState) => state.copy)
  const userErr = useSelector((state: RootState) => state.user)
  const authErr = useSelector((state: RootState) => state.auth)

  const errorMessages = [categoryErr, bookErr, authorErr, copyErr, userErr, authErr]
  // There can only be one error at the time. Function returns that error if it exists
  const errorMessage = findError(errorMessages)

  const closeModal = () => {
    dispatch(nullifyCategoryError())
  }

  return (
    <div className="App w-full">
      <Navbar />
      <div className="mt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="books/:id" element={<BookDetails />} />
          <Route path="authors/add" element={<ProtectedRoute component={AddAuthor} />} />
          <Route path="admin/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />
          <Route path="categories/add" element={<ProtectedRoute component={AddCategory} />} />
          <Route path="categories/edit/:id" element={<ProtectedRoute component={EditCategory} />} />
          <Route path="authors/edit/:id" element={<ProtectedRoute component={EditAuthor} />} />
          <Route
            path="/admin/dashboard/copies/edit/:id"
            element={<ProtectedRoute component={EditCopy} />}
          />
          <Route path="books/add" element={<ProtectedRoute component={AddBook} />} />
          <Route
            path="/admin/dashboard/books/edit/:id"
            element={<ProtectedRoute component={EditBook} />}
          />
        </Routes>
      </div>
      {errorMessage && (
        <Modal heading={'Error!'} text={errorMessage} type={'error'} close={closeModal} />
      )}
    </div>
  )
}

export default App
