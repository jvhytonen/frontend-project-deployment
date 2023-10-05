import AdminBooks from '../AdminBooks/AdminBooks'
import AdminAuthors from '../AdminAuthors/AdminAuthors'
import AdminCategories from '../AdminCategories/AdminCategories'
import AdminTabs from '../AdminTabs/AdminTabs'
import { useState } from 'react'
import { AdminTabTypes } from '../../../features/types/componentTypes'

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
        <div className="w-1/3 mx-auto">
          <div className="bg-white shadow-md rounded my-6">
            <AdminCategories />
          </div>
        </div>
      )
      break
    case 'authors':
      activeTabComponent = (
        <div className="w-1/3 mx-auto">
          <div className="bg-white shadow-md rounded my-6">
            <AdminAuthors />
          </div>
        </div>
      )
      break
    default:
      activeTabComponent = null // Handle any other case here, if needed
  }
  return (
    <div className="w-full">
      <AdminTabs handleTabChange={handleTabChange} />
      {activeTabComponent}
    </div>
  )
}

export default AdminDashboard
