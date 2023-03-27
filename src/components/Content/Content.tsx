import { Routes, Route } from 'react-router-dom'

import Login from '../Login/Login'
import Books from '../Books/Books'
import Authors from '../Authors/Authors'
import Logout from '../Logout/Logout'
import Home from '../Home/Home'
import AuthorForm from '../AuthorForm/AuthorForm'

export function Content() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/authors" element={<Authors />} />
      <Route path="/books" element={<Books />} />
      <Route path="author-form" element={<AuthorForm />} />
    </Routes>
  )
}

export default Content
