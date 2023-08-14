import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, getAllBooks } from '../../features/slices/bookSlice'
import { fetchAuthors } from '../../features/slices/authorSlice'
import { getAllCategories } from '../../features/slices/categorySlice'
import { TableCell, TableRow } from '../TableItems/TableItems'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import AdminTable from '../AdminTable/AdminTable'

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
  const headers = ['Author', 'Title', 'Category', 'Actions']
  const rows =
    book.items !== null && book.items.length > 0
      ? book.items.map((book) => (
          <TableRow key={book.id}>
            <TableCell>{book.author.name}</TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.category.name}</TableCell>
            <TableCell>
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
              <Button label="Delete book" handleClick={() => handleDelete(book.id)} type="delete" />
            </TableCell>
          </TableRow>
        ))
      : [
          <TableRow key={0}>
            <TableCell>No books found.</TableCell>
          </TableRow>
        ]

  return (
    <>
      <AdminTable headers={headers} rows={rows} />
      <div className="flex justify-center">
        <Button label="Add book" handleClick={handleNavigation} type="neutral" />
      </div>
    </>
  )
}

export default AdminBooks
