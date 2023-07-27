import React from 'react'
import TableHeading from '../TableHeading/TableHeading'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCategory } from '../../features/slices/categorySlice'

function AdminCategories() {
  const categories = useSelector((state: RootState) => state.category)
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = (id: string | undefined) => {
    if (id !== undefined && token !== null) {
      const deleteReq = {
        id: id,
        token: token
      }
      dispatch(deleteCategory(deleteReq))
    } else {
      return
    }
  }

  return (
    <table className="max-w-[40%] divide-y divide-gray-200 w-full">
      <thead className="bg-gray-50">
        <tr>
          <TableHeading label="Author" />
          <TableHeading label="Actions" />
        </tr>
      </thead>
      <tbody>
        {categories.items !== null && categories.items.length > 0 ? (
          categories.items.map((category) => {
            return (
              <tr key={category.id}>
                <td className="py-4 px-6 whitespace-nowrap">{category.name}</td>
                <td className="py-4 px-6 whitespace-nowrap space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => navigate(`books/edit/${category.id}`)}>
                    Edit category
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleDelete(category.id)}>
                    Delete category
                  </button>
                </td>
              </tr>
            )
          })
        ) : (
          <tr>
            <td className="py-4 px-6 whitespace-nowrap" colSpan={5}>
              No categories found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default AdminCategories
