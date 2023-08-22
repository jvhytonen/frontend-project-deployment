import React, { useEffect } from 'react'
import Button from '../Button/Button'
import { askConfirmation, finished } from '../../features/slices/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { useNavigate } from 'react-router-dom'
import { deleteAuthor } from '../../features/slices/authorSlice'
import { DeleteAuthorType } from '../../features/types/types'

function DeleteAuthor({ authorId, authorName }: DeleteAuthorType) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const token = useSelector((state: RootState) => state.auth.token)
  const modal = useSelector((state: RootState) => state.modal)

  const handleDeleteConfirmation = (id: string, name: string) => {
    dispatch(askConfirmation(`Are you sure you want to delete author "${name}"?`))
  }

  const handleDelete = async () => {
    if (token !== null) {
      const deleteReq = {
        id: authorId,
        token: token
      }
      await dispatch(deleteAuthor(deleteReq)).unwrap()
      dispatch(finished('Author deleted'))
      navigate('../admin/dashboard')
    }
  }

  useEffect(() => {
    if (modal.status === 'confirmed') {
      handleDelete()
    }
  }, [modal.status])
  return (
    <Button
      label="Delete author"
      handleClick={() => handleDeleteConfirmation(authorId, authorName)}
      type="delete"
    />
  )
}

export default DeleteAuthor
