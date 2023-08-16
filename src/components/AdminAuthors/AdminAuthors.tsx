import { TableCell, TableRow } from '../TableItems/TableItems'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteAuthor } from '../../features/slices/authorSlice'
import Button from '../Button/Button'
import AdminTable from '../AdminTable/AdminTable'
import { useModal } from '../../features/hooks/useModal'
import { useState } from 'react'
import { Author } from '../../features/types/types'
import Modal from '../Modal/Modal'

function AdminAuthors() {
  const {
    showConfirmation,
    showCompletion,
    confirmationText,
    handleConfirm,
    setShowConfirmation,
    setShowCompletion
  } = useModal()
  const [authorToDelete, setAuthorToDelete] = useState<Author | null>(null)
  const authors = useSelector((state: RootState) => state.author)
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleNavigation = () => {
    navigate('../authors/add')
  }

  // In case the user don't want to add new category
  const handleCancel: () => void = () => {
    setShowConfirmation(false)
  }
  //When user clicks "ok" after successfull addition of category.
  const handleCompletionModalClosing: () => void = () => {
    setAuthorToDelete(null)
    setShowCompletion(false)
    navigate('../admin/dashboard')
  }
  const handleDelete = async () => {
    setShowConfirmation(false)
    if (authorToDelete !== null && authorToDelete.id !== undefined && token !== null) {
      const deleteReq = {
        id: authorToDelete.id,
        token: token
      }
      await dispatch(deleteAuthor(deleteReq)).unwrap()
      setShowCompletion(true)
    } else {
      return
    }
  }
  // Headers used in this table
  const headers = ['Name', 'Actions']

  const rows =
    authors.items !== null && authors.items.length > 0
      ? authors.items.map((author) => {
          return (
            <TableRow key={author.id}>
              <TableCell>{author.name}</TableCell>
              <TableCell>
                <Button
                  label="Edit author"
                  handleClick={() => navigate(`../authors/edit/${author.id}`)}
                  type="edit"
                />
                <Button
                  label="Delete author"
                  handleClick={(e) => {
                    setAuthorToDelete(author)
                    handleConfirm(e, `Are you sure you want to delete author "${author.name}"`)
                  }}
                  type="delete"
                />
              </TableCell>
            </TableRow>
          )
        })
      : [
          <TableRow key={0}>
            <TableCell>No authors</TableCell>
          </TableRow>
        ]

  return (
    <>
      <AdminTable headers={headers} rows={rows} />
      <div className="flex justify-center">
        <Button label="Add new author" handleClick={handleNavigation} type="neutral" />
      </div>
      {/* Modal to ask confirmation from the user. */}
      {showConfirmation && authorToDelete !== null ? (
        <Modal
          type="confirm"
          heading={'Confirm deleting author'}
          text={confirmationText}
          onConfirm={handleDelete}
          onCancel={handleCancel}
        />
      ) : null}
      {/* Modal to show that the operation was succesfull. */}
      {showCompletion && (
        <Modal
          type="success"
          heading={'Author deleted'}
          text={`Author "${authorToDelete?.name}" deleted.`}
          onConfirm={handleCompletionModalClosing}
        />
      )}
    </>
  )
}

export default AdminAuthors
