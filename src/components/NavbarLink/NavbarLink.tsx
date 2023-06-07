import React from 'react'
import { Link } from 'react-router-dom'
import { NavbarLinkType } from '../../features/types/types'

function NavbarLink({ link, label }: NavbarLinkType) {
  return (
    <li className="block py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
      <Link to={link}>{label}</Link>
    </li>
  )
}

export default NavbarLink
