import React, { useEffect, useState } from 'react'
import { TableCell, TableRow } from '../TableItems/TableItems'
import { AppDispatch, RootState } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCategory } from '../../../features/slices/categorySlice'
import Button from '../../Button/Button'
import AdminTable from '../AdminTable/AdminTable'
import { askConfirmation, finished } from '../../../features/slices/modalSlice'
import { Category } from '../../../features/types/reduxTypes'
import { Typography } from '@material-tailwind/react'

function AdminCategories() {
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
  const categories = useSelector((state: RootState) => state.category)
  const token = useSelector((state: RootState) => state.auth.token)
  const modal = useSelector((state: RootState) => state.modal)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleNavigation = () => {
    navigate('../categories/add')
  }

  const handleDeleteConfirmation = (objToDelete: Category) => {
    setCategoryToDelete(objToDelete)
    dispatch(askConfirmation(`Are you sure you want to delete category "${objToDelete.name}"?`))
  }

  const handleDelete = async () => {
    if (categoryToDelete !== null && categoryToDelete.id !== undefined && token !== null) {
      const deleteReq = {
        id: categoryToDelete.id,
        token: token
      }
      await dispatch(deleteCategory(deleteReq)).unwrap()
      dispatch(finished('Category deleted'))
      navigate('../admin/dashboard')
    } else {
      return
    }
  }

  useEffect(() => {
    if (modal.status === 'confirmed') {
      handleDelete()
    }
  }, [modal.status])

  return (
    <table className="w-full h-[50%] table-auto text-left">
      <thead>
        <tr>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal leading-none opacity-70">
              Category
            </Typography>
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" colSpan={2}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal leading-none opacity-70">
              Actions
            </Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.items !== null
          ? categories.items.map((item, index) => {
              const isLast = index === categories.items!.length - 1
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

              return (
                <tr key={item.name}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      onClick={() => navigate(`../categories/edit/${item.id}`)}>
                      Edit
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      onClick={() => handleDeleteConfirmation(item)}>
                      Delete
                    </Typography>
                  </td>
                </tr>
              )
            })
          : null}
      </tbody>
    </table>
  )
}

export default AdminCategories
