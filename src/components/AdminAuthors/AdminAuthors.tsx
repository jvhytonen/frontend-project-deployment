import { TableCell, TableRow } from '../TableItems/TableItems'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteAuthor } from '../../features/slices/authorSlice'
import Button from '../Button/Button'
import AdminTable from '../AdminTable/AdminTable'
import { useEffect, useState } from 'react'
import { askConfirmation, finished } from '../../features/slices/modalSlice'
import { Author } from '../../features/types/reduxTypes'

function AdminAuthors() {
  const [authorToDelete, setAuthorToDelete] = useState<Author | null>(null)
  const authors = useSelector((state: RootState) => state.author)
  const modal = useSelector((state: RootState) => state.modal)
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleNavigation = () => {
    navigate('../authors/add')
  }
  const handleDeleteConfirmation = (objToDelete: Author) => {
    setAuthorToDelete(objToDelete)
    dispatch(askConfirmation(`Are you sure you want to delete author "${objToDelete.name}"?`))
  }

  const handleDelete = async () => {
    if (token !== null && authorToDelete !== null) {
      const deleteReq = {
        id: authorToDelete.id,
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
  // Headers used in this table
  const headers = ['Name', 'Actions']

  const rows =
    authors.items !== null && authors.items.length > 0
      ? authors.items.map((author: Author) => {
          return (
            <TableRow key={author.id}>
              <TableCell>{author.name}</TableCell>
              <TableCell>
                <div className="flex justify-around">
                  <Button
                    label="Edit"
                    handleClick={() => navigate(`../authors/edit/${author.id}`)}
                    type="edit"
                  />
                  <Button
                    label="Delete"
                    handleClick={() => handleDeleteConfirmation(author)}
                    type="delete"
                  />
                </div>
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
        <Button label="New author" handleClick={handleNavigation} type="neutral" />
      </div>
    </>
  )
}

export default AdminAuthors
