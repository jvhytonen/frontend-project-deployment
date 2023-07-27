import React from 'react'
import AdminBooks from '../AdminBooks/AdminBooks'
import AdminAuthors from '../AdminAuthors/AdminAuthors'
import AdminCategories from '../AdminCategories/AdminCategories'

function AdminDashboard() {
  return (
    <div>
      <AdminBooks />
      <div className="w-full flex my-2">
        <div className="w-1/2">
          <h2 className="font-bold text-2xl text-center">Authors</h2>
          <AdminAuthors />
        </div>
        <div className="w-1/2">
          <h2 className="font-bold text-2xl text-center">Categories</h2>
          <AdminCategories />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
