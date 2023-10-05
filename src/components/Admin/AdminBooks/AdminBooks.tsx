import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'

import { deleteBook, getAllBooks } from '../../../features/slices/bookSlice'
import { getAllAuthors } from '../../../features/slices/authorSlice'
import { getAllCategories } from '../../../features/slices/categorySlice'
import { TableCell, TableRow } from '../TableItems/TableItems'
import { useNavigate } from 'react-router-dom'
import Button from '../../Button/Button'
import AdminTable from '../AdminTable/AdminTable'
import NoData from '../../NoData/NoData'
import Loading from '../../Loading/Loading'
import { askConfirmation, finished } from '../../../features/slices/modalSlice'
import { Book } from '../../../features/types/reduxTypes'

function AdminBooks() {
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const book = useSelector((state: RootState) => state.book)
  const modal = useSelector((state: RootState) => state.modal)
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  const handleDeleteConfirmation = (objToDelete: Book) => {
    setBookToDelete(objToDelete)
    dispatch(askConfirmation(`Are you sure you want to delete book "${objToDelete.title}"?`))
  }

  const handleDelete = async () => {
    if (token !== null && bookToDelete !== null && bookToDelete.id) {
      const deleteReq = {
        id: bookToDelete.id,
        token: token
      }
      await dispatch(deleteBook(deleteReq)).unwrap()
      dispatch(finished('Book deleted'))
      navigate('../admin/dashboard')
    }
  }
  useEffect(() => {
    dispatch(getAllBooks())
    dispatch(getAllAuthors())
    dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    if (modal.status === 'confirmed') {
      handleDelete()
    }
  }, [modal.status])
  const headers = ['Author', 'Title', 'Category', 'Actions']
  const rows =
    book.items !== null && book.items.length > 0
      ? book.items.map((book: Book) => (
          <TableRow key={book.id}>
            <TableCell>{book.author.name}</TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.category.name}</TableCell>
            <TableCell>
              <a className="text-gray-100 font-bold py-1 px-3 rounded text-xs bg-green-500 hover:bg-green-700">
                Edit
              </a>
              <a className="text-gray-100 font-bold py-1 px-3 rounded text-xs bg-blue-500 hover:bg-blue-700">
                View
              </a>
            </TableCell>
          </TableRow>
        ))
      : [<NoData key="no-data" />] // This will be displayed instead of rows if there are no data in the table.

  return (
    <>
      {/* If the data
      is still under loading in the server the loading will be shown. */}
      <AdminTable headers={headers} rows={book.isLoading ? [<Loading key="loading" />] : rows} />

      <div className="flex justify-center">
        <Button label="Add book" handleClick={() => navigate('../books/add')} type="neutral" />
      </div>
    </>
  )
}

export default AdminBooks
