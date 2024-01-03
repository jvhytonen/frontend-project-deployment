import { useState } from 'react'

import AdminBooks from '../AdminBooks/AdminBooks'
import AdminAuthors from '../AdminAuthors/AdminAuthors'
import AdminCategories from '../AdminCategories/AdminCategories'
import DashboardNavigation from '../DashBoardNavigation/DashboardNavigation'
import AdminUsers from '../AdminUsers/AdminUsers'
import AdminHome from '../AdminHome/AdminHome'

function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState<string>('home')
  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab)
  }

  let activeTabComponent

  // Use a switch statement or if-else statements to determine the activeTabComponent
  switch (currentTab) {
    case 'home':
      activeTabComponent = (
        <div className="w-[75%] mx-auto">
          <div className="bg-white shadow-md rounded my-6">
            <AdminHome />
          </div>
        </div>
      )
      break
    case 'books':
      activeTabComponent = (
        <div className="w-[75%] mx-auto">
          <div className="bg-white shadow-md rounded my-6">
            <AdminBooks />
          </div>
        </div>
      )
      break
    case 'categories':
      activeTabComponent = (
        <div className="w-[75%] mt-5 text-center">
          <AdminCategories />
        </div>
      )
      break
    case 'authors':
      activeTabComponent = (
        <div className="w-[75%] mt-5 text-center">
          <AdminAuthors />
        </div>
      )
      break
    case 'users':
      activeTabComponent = (
        <div className="w-[75%] mt-5 text-center">
          <AdminUsers />
        </div>
      )
      break
    default:
      activeTabComponent = null
  }
  return (
    <div className="w-full flex">
      <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem]">
        <DashboardNavigation handleTabChange={handleTabChange} />
      </div>
      {activeTabComponent}
    </div>
  )
}

export default AdminDashboard
