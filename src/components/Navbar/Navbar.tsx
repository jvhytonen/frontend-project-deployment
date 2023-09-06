import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../store'
import { logUserOut } from '../../features/slices/authSlice'
import Button from '../Button/Button'
import MobileMenu from '../MobileMenu/MobileMenu'
import DesktopMenu from '../DesktopMenu/DesktopMenu'
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon'
import NavbarUserInfo from '../NavbarUserInfo/NavbarUserInfo'

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
          <HamburgerIcon
            isMobileNavOpen={isMobileNavOpen}
            handleClick={() => setIsMobileNavOpen((prevState) => !prevState)}
          />
          <NavbarUserInfo user={user} />
          {/*   Login/logout-button */}
          <Button
            label={user.items.username !== '' ? 'Logout' : 'Login'}
            handleClick={handleLoginLogOut}
            type="neutral"
          />
        </div>
        <DesktopMenu isAdmin={user && user.items.role === 'ADMIN'} />
      </div>
      {/* Mobile menu */}
      {isMobileNavOpen ? <MobileMenu isAdmin={user && user.items.role === 'ADMIN'} /> : null}
    </nav>
  )
}

export default Navbar
