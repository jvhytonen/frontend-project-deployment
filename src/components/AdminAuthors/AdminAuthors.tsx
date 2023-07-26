import React from 'react'
import TableHeading from '../TableHeading/TableHeading'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AdminAuthors() {
  const authors = useSelector((state: RootState) => state.author)
  const navigate = useNavigate()

  return (
    <table className="max-w-[40%] divide-y divide-gray-200 w-full">
      <thead className="bg-gray-50">
        <tr>
          <TableHeading label="Author" />
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
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => navigate(`books/edit/${author.id}`)}>
                    Edit book
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => alert('Delete!')}>
                    Delete author
                  </button>
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
  )
}

export default AdminAuthors
