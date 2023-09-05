import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../store'
import { logUserOut } from '../../features/slices/authSlice'
import NavbarLink from '../NavbarLink/NavbarLink'
import Button from '../Button/Button'
import NavbarLinkMobile from '../NavBarLinkMobile/NavBarLinkMobile'

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
            {/* The icon */}
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
          {user ? <p>Welcome {user.items.username}</p> : null}
          {/*   Login/logout-button */}
          <Button
            label={user.items.username !== '' ? 'Logout' : 'Login'}
            handleClick={handleLoginLogOut}
            type="neutral"
          />
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
                <NavbarLink link="/admin/dashboard" label="Admin dashboard" />
              </>
            ) : null}
          </ul>
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileNavOpen ? (
        <div className="md:hidden border-gray-200 w-[50%]">
          <ul>
            <NavbarLinkMobile link="/" label="Home" />
            <NavbarLinkMobile link="/books" label="Books" />
            <NavbarLinkMobile link="/authors" label="Authors" />
            {user && user.items.role === 'ADMIN' ? (
              <>
                <NavbarLinkMobile link="/admin/dashboard" label="Admin dashboard" />
              </>
            ) : null}
          </ul>
        </div>
      ) : null}
    </nav>
  )
}

export default Navbar
