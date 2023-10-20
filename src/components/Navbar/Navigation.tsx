import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Button, Typography, IconButton, Collapse } from '@material-tailwind/react'

import { AppDispatch, RootState } from '../../store'
import { logUserOut } from '../../features/slices/authSlice'
import NavbarLink from '../NavbarLink/NavbarLink'

function Navigation() {
  const [openNav, setOpenNav] = useState<boolean>(false)
  const user = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    //For changing the navigation to mobile (and back).
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false))
  }, [])
  /* When the login/logout -button is pressed, the user is guided to login or logged out */
  const handleLoginLogOut = () => {
    if (user.token) {
      dispatch(logUserOut())
      navigate('/logout')
    } else {
      navigate('/login')
    }
  }
  {
    /* Navigation links */
  }
  const navHeadings = ['Home', 'Books', 'News', 'About']
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navHeadings.map((heading, index) => (
        <Typography
          key={index}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal">
          <NavbarLink link={heading.toLowerCase()} label={heading} />
        </Typography>
      ))}
      {/* If the user is ADMIN, the link to Dashboard will be visible */}
      {user.items.role === 'ADMIN' ? (
        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
          <NavbarLink link="admin/dashboard" label="Admin" />
        </Typography>
      ) : null}
    </ul>
  )

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography as="a" href="/" className="mr-4 cursor-pointer py-1.5 font-medium">
          Material Tailwind
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
            onClick={handleLoginLogOut}>
            {user.token ? 'Logout' : 'Login'}
          </Button>
          {/* Hamburger icon and closing icon for mobile navigation */}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}>
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      {/* Mobile navigation */}
      <Collapse open={openNav}>
        {navList}
        <Button variant="gradient" size="sm" fullWidth className="mb-2" onClick={handleLoginLogOut}>
          <span>{user.token ? 'Logout' : 'Login'}</span>
        </Button>
      </Collapse>
    </Navbar>
  )
}

export default Navigation
