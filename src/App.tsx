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
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'
import Modal from './components/Modal/Modal'
import { findError } from './features/utils/errors'
import { nullifyCategoryError } from './features/slices/categorySlice'
import EditCategory from './components/EditCategory/EditCategory'
import { nullifyBookError } from './features/slices/bookSlice'
import { nullifyAuthorError } from './features/slices/authorSlice'
import { nullifyCopyError } from './features/slices/copySlice'
import { nullifyUserError } from './features/slices/userSlice'
import { findLoadingStates } from './features/utils/helpers'
import { nullifyAuthError } from './features/slices/authSlice'
import AdminCopies from './components/AdminCopies/AdminCopies'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  // For the global error modal.
  const category = useSelector((state: RootState) => state.category)
  const book = useSelector((state: RootState) => state.book)
  const author = useSelector((state: RootState) => state.author)
  const copy = useSelector((state: RootState) => state.copy)
  const user = useSelector((state: RootState) => state.user)
  const auth = useSelector((state: RootState) => state.auth)

  const states = [category, book, author, copy, user, auth]
  // There can only be one error at the time. Function returns that error if it exists
  const errorMessage = findError(states)
  // The cursor will be in wait-mode if there is ongoing API-request that is not completed.
  const isLoading = findLoadingStates(states)
  document.body.style.cursor = isLoading ? 'wait' : 'auto'

  const closeModal = () => {
    if (category) {
      dispatch(nullifyCategoryError())
    }
    if (book) {
      dispatch(nullifyBookError())
    }
    if (author) {
      dispatch(nullifyAuthorError())
    }
    if (category) {
      dispatch(nullifyCategoryError())
    }
    if (copy) {
      dispatch(nullifyCopyError())
    }
    if (user) {
      dispatch(nullifyUserError())
    }
    if (auth) {
      dispatch(nullifyAuthError())
    }
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
            element={<ProtectedRoute component={AdminCopies} />}
          />
          <Route path="books/add" element={<ProtectedRoute component={AddBook} />} />
          <Route
            path="/admin/dashboard/books/edit/:id"
            element={<ProtectedRoute component={EditBook} />}
          />
        </Routes>
      </div>
      {/*  Error-modal will be shown above all other features with backdrop and that's why it's
      here. */}
      {errorMessage && (
        <Modal heading={'Error!'} text={errorMessage} type={'error'} onConfirm={closeModal} />
      )}
    </div>
  )
}

export default App
