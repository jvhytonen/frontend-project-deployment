import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, getAllBooks } from '../../features/slices/bookSlice'
import { fetchAuthors } from '../../features/slices/authorSlice'
import { getAllCategories } from '../../features/slices/categorySlice'
import TableHeading from '../TableHeading/TableHeading'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'

function AdminBooks() {
  const dispatch = useDispatch<AppDispatch>()
  const book = useSelector((state: RootState) => state.book)
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate('../books/add')
  }

  const handleDelete = (id: string | undefined) => {
    console.log(id)
    if (id !== undefined && token !== null) {
      const deleteReq = {
        id: id,
        token: token
      }
      dispatch(deleteBook(deleteReq))
    } else {
      return
    }
  }
  useEffect(() => {
    dispatch(getAllBooks())
    dispatch(fetchAuthors())
    dispatch(getAllCategories())
  }, [])

  return (
    <>
      <table className="divide-y divide-gray-200 w-full">
        <thead className="bg-gray-50">
          <tr>
            <TableHeading label="Author" />
            <TableHeading label="Title" />
            <TableHeading label="Category" />
            <TableHeading label="Actions" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {book.items !== null && book.items.length > 0 ? (
            book.items.map((book) => {
              return (
                <tr key={book.id} className="hover:bg-gray-100">
                  <td className="py-4 px-6 whitespace-nowrap">{book.author.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{book.title}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{book.category.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap space-x-2">
                    <Button
                      label="Edit book"
                      handleClick={() => navigate(`books/edit/${book.id}`)}
                      type="edit"
                    />
                    <Button
                      label="Edit copies"
                      handleClick={() => navigate(`copies/edit/${book.id}`)}
                      type="edit"
                    />
                    {book.id}
                    <Button
                      label="Delete book"
                      handleClick={() => handleDelete(book.id)}
                      type="delete"
                    />
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td className="py-4 px-6 whitespace-nowrap" colSpan={5}>
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center">
        <Button label="Add book" handleClick={handleNavigation} type="neutral" />
      </div>
    </>
  )
}

export default AdminBooks
