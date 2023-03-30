import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../store'
import { logUserOut } from '../../features/user/userSlice'

function Header() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className="h-[100px] bg-red-300">
      {user.name !== null ? (
        <h2>
          Logged in as {user.isAdmin ? 'ADMIN ' : null}
          {user.name}
        </h2>
      ) : null}
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
        {user.isAdmin ? (
          <li>
            <Link to="/authors/add">Add new author</Link>
          </li>
        ) : null}
        {user.isAdmin ? (
          <li>
            <Link to="/books/add">Add new book</Link>
          </li>
        ) : null}
        <li>
          {user.name !== null ? (
            <Link onClick={() => dispatch(logUserOut('Bye bye!'))} to="/logout">
              {' '}
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Header
