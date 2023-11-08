import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './App.css'
import Login from './components/Login/Login'
import Books from './components/Books/Books'
import Authors from './components/Authors/Authors'
import Logout from './components/Logout/Logout'
import Home from './components/Home/Home'
import Modal from './components/Modal/Modal'
import AddAuthor from './components/Admin/AddAuthor/AddAuthor'
import BookDetails from './components/BookDetails/BookDetails'
import EditBook from './components/EditBook/EditBook'
import AddBook from './components/Admin/AddBook/AddBook'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import EditAuthor from './components/EditAuthor/EditAuthor'
import Navbar from './components/Navbar/Navigation'
import AddCategory from './components/Admin/AddCategory/AddCategory'
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard'
import Signup from './components/Signup/Signup'
import { RootState } from './store'

import EditCategory from './components/EditCategory/EditCategory'
import { findLoadingStates } from './features/utils/helpers'
import NewsSection from './components/NewsSection/NewsSection'
import About from './components/About/About'
import AdminCopies from './components/Admin/AdminCopies/AdminCopies'

function App() {
  // To control the mouse cursor during loading stage.
  const category = useSelector((state: RootState) => state.category)
  const book = useSelector((state: RootState) => state.book)
  const author = useSelector((state: RootState) => state.author)
  const copy = useSelector((state: RootState) => state.copy)
  const user = useSelector((state: RootState) => state.user)
  const auth = useSelector((state: RootState) => state.auth)
  const modal = useSelector((state: RootState) => state.modal)

  const states = [category, book, author, copy, user, auth]
  // The cursor will be in wait-mode if there is ongoing API-request that is not completed.
  const isLoading = findLoadingStates(states)
  document.body.style.cursor = isLoading ? 'wait' : 'auto'
  return (
    <div className="App w-full">
      <Navbar />
      <div className="flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/news" element={<NewsSection />} />
          <Route path="/books" element={<Books />} />
          <Route path="books/:id" element={<BookDetails />} />
          <Route path="about" element={<About />} />
          <Route path="admin/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />
          <Route path="authors/add" element={<ProtectedRoute component={AddAuthor} />} />
          <Route path="categories/add" element={<ProtectedRoute component={AddCategory} />} />
          <Route path="categories/edit/:id" element={<ProtectedRoute component={EditCategory} />} />
          <Route path="authors/edit/:id" element={<ProtectedRoute component={EditAuthor} />} />
          <Route path="books/add" element={<ProtectedRoute component={AddBook} />} />
          <Route path="copies/edit/:id" element={<ProtectedRoute component={AdminCopies} />} />
          <Route
            path="/admin/dashboard/books/edit/:id"
            element={<ProtectedRoute component={EditBook} />}
          />
        </Routes>
      </div>
      {/* Global modal will be visible if isOpen in the modalSlice is true */}
      {modal.isOpen ? <Modal /> : null}
    </div>
  )
}

export default App
