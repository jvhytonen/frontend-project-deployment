import React from 'react'
import { NavbarUserInfoProps } from '../../features/types/componentTypes'

function NavbarUserInfo({ user }: NavbarUserInfoProps) {
  return user.items.username.length > 1 ? (
    <p className="font-semibold">Welcome {user.items.username}</p>
  ) : null
}

export default NavbarUserInfo
