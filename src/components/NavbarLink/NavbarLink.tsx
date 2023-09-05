import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavbarLinkProps } from '../../features/types/componentTypes'

function NavbarLink({ link, label }: NavbarLinkProps) {
  return (
    <li className="block py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
      {/* NavLink automatically detects which link is active. The active link has blue text. */}
      <NavLink to={link} className={({ isActive }) => (isActive ? 'text-blue-700' : '')} end>
        {label}
      </NavLink>
    </li>
  )
}

export default NavbarLink
