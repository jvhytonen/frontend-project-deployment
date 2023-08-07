import React from 'react'
import TableHeading from '../TableHeading/TableHeading'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCategory } from '../../features/slices/categorySlice'
import Button from '../Button/Button'

function AdminCategories() {
  const categories = useSelector((state: RootState) => state.category)
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleNavigation = () => {
    navigate('../categories/add')
  }

  const handleDelete = (id: string | undefined) => {
    console.log(id)
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
    <>
      <table className="divide-y divide-gray-200 w-full">
        <thead className="bg-gray-50">
          <tr>
            <TableHeading label="Name" />
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
                    <Button
                      label="Edit category"
                      handleClick={() => navigate(`books/edit/${category.id}`)}
                      type="edit"
                    />
                    <Button
                      label="Delete category"
                      handleClick={() => handleDelete(category.id)}
                      type="delete"
                    />
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
      <div className="flex justify-center">
        <Button label="Add new author" handleClick={handleNavigation} type="neutral" />
      </div>
    </>
  )
}

export default AdminCategories
