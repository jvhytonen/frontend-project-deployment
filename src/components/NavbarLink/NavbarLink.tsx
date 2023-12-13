import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavbarLinkProps } from '../../features/types/componentTypes'

function NavbarLink({ link, label }: NavbarLinkProps) {
  return (
    <NavLink
      to={link === 'home' ? '/' : link}
      className={({ isActive }) => (isActive ? 'text-blue-700' : '')}
      end>
      {label}
    </NavLink>
  )
}

export default NavbarLink
