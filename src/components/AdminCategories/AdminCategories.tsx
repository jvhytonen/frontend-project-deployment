import React, { useState } from 'react'
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

function AdminCategories() {
  const {
    showConfirmation,
    showCompletion,
    confirmationText,
    handleConfirm,
    setShowConfirmation,
    setShowCompletion
  } = useModal()
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
  const categories = useSelector((state: RootState) => state.category)
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleNavigation = () => {
    navigate('../categories/add')
  }
  // In case the user don't want to add new category
  const handleCancel: () => void = () => {
    setShowConfirmation(false)
  }
  //When user clicks "ok" after successfull addition of category.
  const handleCompletionModalClosing: () => void = () => {
    setCategoryToDelete(null)
    setShowCompletion(false)
    navigate('../admin/dashboard')
  }
  const handleDelete = async () => {
    setShowConfirmation(false)
    if (categoryToDelete !== null && categoryToDelete.id !== undefined && token !== null) {
      const deleteReq = {
        id: categoryToDelete.id,
        token: token
      }
      await dispatch(deleteCategory(deleteReq)).unwrap()
      setShowCompletion(true)
    } else {
      return
    }
  }
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
                <Button
                  label="Edit category"
                  handleClick={() => navigate(`../categories/edit/${category.id}`)}
                  type="edit"
                />
                <Button
                  label="Delete category"
                  handleClick={(e) => {
                    setCategoryToDelete(category)
                    handleConfirm(e, `Are you sure you want to delete category "${category.name}"`)
                  }}
                  type="delete"
                />
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
        <Button label="Add new category" handleClick={handleNavigation} type="neutral" />
      </div>
      {/* Modal to ask confirmation from the user. */}
      {showConfirmation && categoryToDelete !== null ? (
        <Modal
          type="confirm"
          heading={'Confirm deleting category'}
          text={confirmationText}
          onConfirm={handleDelete}
          onCancel={handleCancel}
        />
      ) : null}
      {/* Modal to show that the operation was succesfull. */}
      {showCompletion && (
        <Modal
          type="success"
          heading={'Category succesfully deleted'}
          text={`Category "${categoryToDelete?.name}" deleted.`}
          onConfirm={handleCompletionModalClosing}
        />
      )}
    </>
  )
}

export default AdminCategories
