import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavbarLinkProps } from '../../features/types/componentTypes'

function NavbarLink({ link, label }: NavbarLinkProps) {
  return (
    <li className="flex items-center">
      {/* NavLink automatically detects which link is active. The active link has blue text. */}
      <NavLink
        to={link === 'home' ? '/' : link}
        className={({ isActive }) => (isActive ? 'text-blue-700' : '')}
        end>
        {label}
      </NavLink>
    </li>
  )
}

export default NavbarLink
