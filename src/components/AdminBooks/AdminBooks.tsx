import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, getAllBooks } from '../../features/slices/bookSlice'
import { getAllAuthors } from '../../features/slices/authorSlice'
import { getAllCategories } from '../../features/slices/categorySlice'
import { TableCell, TableRow } from '../TableItems/TableItems'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import AdminTable from '../AdminTable/AdminTable'
import { useModal } from '../../features/hooks/useModal'
import Modal from '../Modal/Modal'
import { Book } from '../../features/types/types'
import NoData from '../NoData/NoData'
import Loading from '../Loading/Loading'

function AdminBooks() {
  const {
    showConfirmation,
    showCompletion,
    confirmationText,
    handleConfirm,
    setShowConfirmation,
    setShowCompletion
  } = useModal()
  const [bookToBeDeleted, setBookToBeDeleted] = useState<Book | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const book = useSelector((state: RootState) => state.book)
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate('../books/add')
  }
  // In case the user don't want to add new category
  const handleCancel: () => void = () => {
    setShowConfirmation(false)
  }
  //When user clicks "ok" after successfull addition of category.
  const handleCompletionModalClosing: () => void = () => {
    setShowCompletion(false)
    setBookToBeDeleted(null)
    navigate('../admin/dashboard')
  }
  const handleDeleteBook = async () => {
    setShowConfirmation(false)
    if (bookToBeDeleted !== null && bookToBeDeleted.id !== undefined && token !== null) {
      const deleteReq = {
        id: bookToBeDeleted.id,
        token: token
      }
      await dispatch(deleteBook(deleteReq)).unwrap()
      setShowCompletion(true)
    } else {
      return
    }
  }
  useEffect(() => {
    dispatch(getAllBooks())
    dispatch(getAllAuthors())
    dispatch(getAllCategories())
  }, [])
  const headers = ['Author', 'Title', 'Category', 'Actions']
  const rows =
    book.items !== null && book.items.length > 0
      ? book.items.map((book) => (
          <TableRow key={book.id}>
            <TableCell>{book.author.name}</TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.category.name}</TableCell>
            <TableCell>
              <div className="flex justify-around">
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
                <Button
                  label="Delete book"
                  handleClick={(e) => {
                    setBookToBeDeleted(book)
                    handleConfirm(e, `Are you sure you want to delete "${book.title}"?`)
                  }}
                  type="delete"
                />
              </div>
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
