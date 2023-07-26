import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../store'
import { logUserOut } from '../../features/slices/authSlice'
import NavbarLink from '../NavbarLink/NavbarLink'

function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false)
  const user = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLoginLogOut = () => {
    if (user.token) {
      dispatch(logUserOut())
      navigate('/logout')
    } else {
      navigate('/login')
    }
  }

  return (
    <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {user ? <p>Welcome {user.items.username}</p> : null}
        <div className="flex justify-between w-full md:w-auto md:order-2">
          {/*   Hamburger icon */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={isMobileNavOpen ? 'true' : 'false'}
            onClick={() => setIsMobileNavOpen((isMobileNavOpen) => !isMobileNavOpen)}>
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"></path>
            </svg>
          </button>
          <button
            type="button"
            onClick={handleLoginLogOut}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
            {user.items.username !== '' ? 'Logout' : 'Login'}
          </button>
          {!user ? (
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mx-3 md:mr-0">
              Signup
            </button>
          ) : null}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <NavbarLink link="/" label="Home" />
            <NavbarLink link="/books" label="Books" />
            <NavbarLink link="/authors" label="Authors" />
            {user && user.items.role === 'ADMIN' ? (
              <>
                <NavbarLink link="/books/add" label="Add new book" />
                <NavbarLink link="/authors/add" label="Add new author" />
                <NavbarLink link="/categories/add" label="Add new category" />
                <NavbarLink link="/admin/dashboard" label="Admins" />
              </>
            ) : null}
          </ul>
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileNavOpen ? (
        <div className="md:hidden border-gray-200 w-[50%]">
          <ul>
            <li className="py-2 pl-3 pr-4 text-gray-900" onClick={() => setIsMobileNavOpen(false)}>
              <Link to="/">Home</Link>
            </li>
            <li className="py-2 pl-3 pr-4 text-gray-900" onClick={() => setIsMobileNavOpen(false)}>
              <Link to="/books">Books</Link>
            </li>
            <li className="py-2 pl-3 pr-4 text-gray-900" onClick={() => setIsMobileNavOpen(false)}>
              <Link to="/authors">Authors</Link>
            </li>
            {user && user.items.role === 'ADMIN' ? (
              <li
                className="py-2 pl-3 pr-4 text-gray-900"
                onClick={() => setIsMobileNavOpen(false)}>
                <Link to="/authors/add">Add new author</Link>
              </li>
            ) : null}
            {user && user.items.role === 'ADMIN' ? (
              <li
                className="py-2 pl-3 pr-4 text-gray-900"
                onClick={() => setIsMobileNavOpen((isMobileNavOpen) => !isMobileNavOpen)}>
                <Link to="/books/add">Add new book</Link>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </nav>
  )
}

export default Navbar
