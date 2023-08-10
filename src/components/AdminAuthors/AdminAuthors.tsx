import { TableCell, TableRow } from '../TableItems/TableItems'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteAuthor } from '../../features/slices/authorSlice'
import Button from '../Button/Button'
import AdminTable from '../AdminTable/AdminTable'

function AdminAuthors() {
  const authors = useSelector((state: RootState) => state.author)
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleNavigation = () => {
    navigate('../authors/add')
  }

  const handleDelete = (id: string | undefined) => {
    if (id !== undefined && token !== null) {
      const deleteReq = {
        id: id,
        token: token
      }
      dispatch(deleteAuthor(deleteReq))
    } else {
      return
    }
  }

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
                  handleClick={() => handleDelete(author.id)}
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
    </>
  )
}

export default AdminAuthors
