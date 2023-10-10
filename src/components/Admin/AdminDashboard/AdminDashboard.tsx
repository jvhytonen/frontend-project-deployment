import AdminBooks from '../AdminBooks/AdminBooks'
import AdminAuthors from '../AdminAuthors/AdminAuthors'
import AdminCategories from '../AdminCategories/AdminCategories'
import AdminTabs from '../AdminTabs/AdminTabs'
import { useState } from 'react'
import { AdminTabTypes } from '../../../features/types/componentTypes'
import DashboardNavigation from '../DashBoardNavigation/DashboardNavigation'
import { Typography } from '@material-tailwind/react'

function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState<string>('books')
  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab)
  }

  let activeTabComponent

  // Use a switch statement or if-else statements to determine the activeTabComponent
  switch (currentTab) {
    case 'books':
      activeTabComponent = (
        <div className="w-2/3 mx-auto">
          <div className="bg-white shadow-md rounded my-6">
            <AdminBooks />
          </div>
        </div>
      )
      break
    case 'categories':
      activeTabComponent = (
        <div className="w-[75%] mt-5 text-center">
          <Typography variant="h4" className="mb-5">
            Categories
          </Typography>
          <AdminCategories />
        </div>
      )
      break
    case 'authors':
      activeTabComponent = (
        <div className="w-[75%] mt-5 text-center">
          <Typography variant="h4" className="mb-5">
            Authors
          </Typography>
          <AdminAuthors />
        </div>
      )
      break
    default:
      activeTabComponent = null // Handle any other case here, if needed
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
