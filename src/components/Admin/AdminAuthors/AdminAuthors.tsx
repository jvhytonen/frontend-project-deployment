import { AppDispatch, RootState } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteAuthor } from '../../../features/slices/authorSlice'
import { useEffect, useState } from 'react'
import { askConfirmation, finished } from '../../../features/slices/modalSlice'
import { Author } from '../../../features/types/reduxTypes'
import { Card, Typography } from '@material-tailwind/react'
import AdminSearchAndAdd from '../AdminSearchAndAdd/AdminSearchAndAdd'
import FilterAuthors from '../../FilterAuthors/FilterAuthors'

function AdminAuthors() {
  const [authorToDelete, setAuthorToDelete] = useState<Author | null>(null)
  const [filteredAuthors, setFilteredAuthors] = useState<Author[] | null>(null)
  const authors = useSelector((state: RootState) => state.author.items)
  const modal = useSelector((state: RootState) => state.modal)
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleDeleteConfirmation = (objToDelete: Author) => {
    setAuthorToDelete(objToDelete)
    dispatch(askConfirmation(`Are you sure you want to delete author "${objToDelete.name}"?`))
  }

  const filter = (word: string) => {
    if (authors !== null) {
      const foundAuthors = authors.filter((author) => author.name.includes(word))
      setFilteredAuthors(foundAuthors)
      console.log(foundAuthors)
    }
    //console.log(filteredAuthors)
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

  useEffect(() => {
    setFilteredAuthors(authors)
  })

  return (
    <Card className="h-full w-full">
      <AdminSearchAndAdd
        label="These are all the authors stored in the database."
        navigation="../authors/add"
        section="author"
        filter={filter}
      />
      <table className="w-full h-[50%] table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70">
                Author
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
          {filteredAuthors !== null
            ? filteredAuthors.map((item, index) => {
                const isLast = index === filteredAuthors!.length - 1
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
                        onClick={() => navigate(`../authors/edit/${item.id}`)}>
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
    </Card>
  )
}

export default AdminAuthors
