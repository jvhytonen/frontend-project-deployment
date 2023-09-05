import React, { useEffect, useState } from 'react'
import { TableCell, TableRow } from '../TableItems/TableItems'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCategory } from '../../features/slices/categorySlice'
import Button from '../Button/Button'
import AdminTable from '../AdminTable/AdminTable'
import { useModal } from '../../features/hooks/useModal'
import Modal from '../Modal/Modal'
import { Category } from '../../features/types/types'
import { askConfirmation, finished } from '../../features/slices/modalSlice'

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
  // Headers used in this table
  const headers = ['Name', 'Actions']
  // AdminTable.tsx is wrapping this table
  const rows =
    categories.items !== null && categories.items.length > 0
      ? categories.items.map((category) => {
          return (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <div className="flex justify-around">
                  <Button
                    label="Edit"
                    handleClick={() => navigate(`../categories/edit/${category.id}`)}
                    type="edit"
                  />
                  <Button
                    label="Delete"
                    handleClick={() => handleDeleteConfirmation(category)}
                    type="delete"
                  />
                </div>
              </TableCell>
            </TableRow>
          )
        })
      : [
          <TableRow key={0}>
            <TableCell>No categories</TableCell>
          </TableRow>
        ]

  return (
    <>
      <AdminTable headers={headers} rows={rows} />
      <div className="flex justify-center">
        <Button label="New category" handleClick={handleNavigation} type="neutral" />
      </div>
    </>
  )
}

export default AdminCategories
