import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'

function Header() {
  const user = useSelector((state: RootState) => state.user)
  return (
    <div className="h-[100px] bg-red-300">
      {user.name !== null ? <h2>Logged in as {user.name}</h2> : null}
      <ul className="flex justify-around items-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/authors">Authors</Link>
        </li>
        <li>
          <Link to="/author-form">Author form</Link>
        </li>
        <li>
          <Link to="/books/add">Add book</Link>
        </li>
        <li>
          {user.name !== null ? <Link to="/logout"> Logout</Link> : <Link to="/login">Login</Link>}
        </li>
      </ul>
    </div>
  )
}

export default Header
