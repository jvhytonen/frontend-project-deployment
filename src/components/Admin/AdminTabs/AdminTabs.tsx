import React from 'react'
import { AdminTabProps, AdminTabsProps } from '../../../features/types/componentTypes'

const tabLinks = ['authors', 'categories', 'books']

const AdminTab = ({ link, onClick }: AdminTabProps) => {
  return (
    <div
      onClick={onClick}
      className="px-5 py-1 border-b-2 capitalize cursor-pointer hover:text-blue-700">
      {link}
    </div>
  )
}

function AdminTabs({ handleTabChange }: AdminTabsProps) {
  return (
    <div className="w-full flex items-center justify-center">
      {tabLinks.map((item, index) => (
        <AdminTab key={index} link={item} onClick={() => handleTabChange(item)} />
      ))}
    </div>
  )
}

export default AdminTabs
