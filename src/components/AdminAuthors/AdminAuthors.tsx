import React from 'react'
import TableHeading from '../TableHeading/TableHeading'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteAuthor } from '../../features/slices/authorSlice'
import Button from '../Button/Button'

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
          {authors.items !== null && authors.items.length > 0 ? (
            authors.items.map((author) => {
              return (
                <tr key={author.id}>
                  <td className="py-4 px-6 whitespace-nowrap">{author.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap space-x-2">
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
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td className="py-4 px-6 whitespace-nowrap" colSpan={5}>
                No authors found.
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

export default AdminAuthors
