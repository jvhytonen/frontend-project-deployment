import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBooks } from '../../features/book/bookSlice'
import { fetchAuthors } from '../../features/author/authorSlice'
import { getAllCategories } from '../../features/category/categorySlice'
import TableHeading from '../TableHeading/TableHeading'
import Button from '../Button/Button'
import { Link, useNavigate } from 'react-router-dom'

function AdminBooks() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user)
  const book = useSelector((state: RootState) => state.book)
  const copies = useSelector((state: RootState) => state.copy)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllBooks())
    dispatch(fetchAuthors())
    dispatch(getAllCategories())
  }, [])
  const navigateToBookEdit = (id: string) => {
    navigate(`/authors/edit/${id}`)
  }
  return (
    <table className="max-w-[80%] divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <TableHeading label="Author" />
          <TableHeading label="Category" />
          <TableHeading label="Title" />
          <TableHeading label="ISBN" />
          <TableHeading label="Publish year" />
          <TableHeading label="Publisher" />
          <TableHeading label="Actions" />
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {book.items !== null ? (
          book.items.map((book) => {
            return (
              <tr key={book.id}>
                <td className="py-4 px-6 whitespace-nowrap">{book.author.name}</td>
                <td className="py-4 px-6 whitespace-nowrap">{book.category.name}</td>
                <td className="py-4 px-6 whitespace-nowrap">{book.title}</td>
                <td className="py-4 px-6 whitespace-nowrap">{book.isbn}</td>
                <td className="py-4 px-6 whitespace-nowrap">{book.yearPublished}</td>
                <td className="py-4 px-6 whitespace-nowrap">{book.publisher}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => navigate(`books/edit/${book.id}`)}>
                    Edit
                  </button>
                </td>
              </tr>
            )
          })
        ) : (
          <tr>
            <td className="py-4 px-6 whitespace-nowrap" colSpan={8}>
              No books found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default AdminBooks
