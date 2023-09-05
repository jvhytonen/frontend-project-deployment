import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavbarLinkProps } from '../../features/types/componentTypes'

function NavbarLinkMobile({ link, label, closeMobileNav }: NavbarLinkProps) {
  return (
    <li className="py-2 pl-3 pr-4 text-gray-900" onClick={closeMobileNav}>
      {/* NavLink automatically detects which link is active. The active link has blue text. */}
      <NavLink to={link} className={({ isActive }) => (isActive ? 'text-blue-700' : '')} end>
        {label}
      </NavLink>
    </li>
  )
}

export default NavbarLinkMobile
