import React from 'react'
import NavbarLink from '../NavbarLink/NavbarLink'
import { MenuProps } from '../../features/types/componentTypes'

function DesktopMenu({ isAdmin }: MenuProps) {
  return (
    <div
      className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      id="navbar-sticky">
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
        <NavbarLink link="/" label="Home" />
        <NavbarLink link="/books" label="Books" />
        <NavbarLink link="/authors" label="Authors" />
        {isAdmin ? <NavbarLink link="/admin/dashboard" label="Admin dashboard" /> : null}
      </ul>
    </div>
  )
}

export default DesktopMenu
