import React from 'react'
import { NavbarUserInfoProps } from '../../features/types/componentTypes'

function NavbarUserInfo({ user }: NavbarUserInfoProps) {
  return user ? <p className="font-semibold">Welcome {user.items.username}</p> : null
}

export default NavbarUserInfo
