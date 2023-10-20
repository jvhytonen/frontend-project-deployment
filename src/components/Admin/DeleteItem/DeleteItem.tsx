import React, { useEffect, useState } from 'react'
import { Author, Book, Category } from '../../../features/types/reduxTypes'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { askConfirmation, finished } from '../../../features/slices/modalSlice'
import { deleteAuthor } from '../../../features/slices/authorSlice'
import { useNavigate } from 'react-router-dom'
import { deleteCategory } from '../../../features/slices/categorySlice'
import { IconButton, Tooltip } from '@material-tailwind/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { DeleteItemProps } from '../../../features/types/componentTypes'
import { deleteBook } from '../../../features/slices/bookSlice'

function DeleteItem({ feature, item }: DeleteItemProps) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const token = useSelector((state: RootState) => state.auth.token)
  const modal = useSelector((state: RootState) => state.modal)
  const [itemToDelete, setItemToDelete] = useState<Category | Author | Book | null>(null)

  const handleDeleteConfirmation = (objToDelete: Category | Author | Book | null) => {
    console.log('HandleDelete')
    if (objToDelete !== null) {
      setItemToDelete(objToDelete)

      if ('name' in objToDelete) {
        dispatch(
          askConfirmation(
            `Are you sure you want to delete "${(objToDelete as Category | Author).name}"?`
          )
        )
      } else if ('title' in objToDelete) {
        dispatch(
          askConfirmation(`Are you sure you want to delete "${(objToDelete as Book).title}"?`)
        )
      }
    }
  }
  const handleDelete = async () => {
    if (itemToDelete !== null && itemToDelete.id !== undefined && token !== null) {
      const deleteReq = {
        id: itemToDelete.id,
        token: token
      }
      if (feature === 'authors') {
        await dispatch(deleteAuthor(deleteReq)).unwrap()
        dispatch(finished('Author deleted'))
        navigate('../admin/dashboard')
      } else if (feature === 'categories') {
        await dispatch(deleteCategory(deleteReq)).unwrap()
        dispatch(finished('Category deleted'))
        navigate('../admin/dashboard')
      } else if (feature === 'books') {
        await dispatch(deleteBook(deleteReq)).unwrap()
        dispatch(finished('Book deleted'))
        navigate('../admin/dashboard')
      }
    }
  }
  useEffect(() => {
    if (modal.status === 'confirmed') {
      handleDelete()
    }
  }, [modal.status])
  return (
    <div onClick={() => handleDeleteConfirmation(item)}>
      <Tooltip content="Delete">
        <IconButton variant="text">
          <TrashIcon className="h-4 w-4" />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default DeleteItem
