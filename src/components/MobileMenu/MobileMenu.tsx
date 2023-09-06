import React from 'react'
import NavbarLinkMobile from '../NavBarLinkMobile/NavBarLinkMobile'
import { MenuProps } from '../../features/types/componentTypes'

function MobileMenu({ isAdmin }: MenuProps) {
  return (
    <div className="md:hidden border-gray-200 w-[50%]">
      <ul>
        <NavbarLinkMobile link="/" label="Home" />
        <NavbarLinkMobile link="/books" label="Books" />
        <NavbarLinkMobile link="/authors" label="Authors" />
        {isAdmin ? (
          <>
            <NavbarLinkMobile link="/admin/dashboard" label="Admin dashboard" />
          </>
        ) : null}
      </ul>
    </div>
  )
}

export default MobileMenu
