import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { addNewCopy, deleteCopy, getCopies } from '../../features/slices/copySlice'
import Copy from '../Copy/Copy'
import Button from '../Button/Button'
import { TableHeading } from '../TableItems/TableItems'

function EditCopy() {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.auth.token)
  const copies = useSelector((state: RootState) => state.copy)
  const book = useSelector((state: RootState) => state.book)
  // Item is the book related to the copies.
  const item = book.items ? book.items?.find((book) => params.id === book.id) : null

  const handleAddNewCopy = () => {
    if (item !== undefined && item !== null && item.id !== undefined && token !== null) {
      const postReq = {
        bookId: item?.id,
        token: token
      }
      dispatch(addNewCopy(postReq))
    } else {
      return
    }
  }

  const handleDelete = (id: string | undefined) => {
    console.log('Delete ' + id)
    {
      copies.items !== null && copies.items !== undefined ? console.log(copies.items) : null
    }
    console.log(id)
    if (id !== undefined && token !== null) {
      const deleteReq = {
        id: id,
        token: token
      }
      dispatch(deleteCopy(deleteReq))
    } else {
      return
    }
  }

  useEffect(() => {
    if (params.id) {
      dispatch(getCopies(params.id))
    }
  }, [])
  return (
    <div>
      <div>
        <h2>Copies: {item?.title}</h2>
        <h4>ISBN: {item?.isbn}</h4>
      </div>
      <table className="divide-y divide-gray-200 w-full">
        <thead className="bg-gray-50">
          <tr>
            <TableHeading label="Copy id" />
            <TableHeading label="Actions" />
          </tr>
        </thead>
        <tbody>
          {copies.items !== null && copies.items.length > 0 ? (
            copies.items.map((copy) => {
              return (
                <tr key={copy.bookCopyId}>
                  <td className="py-4 px-6 whitespace-nowrap">{copy.bookCopyId}</td>
                  <td className="py-4 px-6 whitespace-nowrap space-x-2">
                    <Button
                      label="Delete copy"
                      handleClick={() => handleDelete(copy.bookCopyId)}
                      type="delete"
                    />
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td className="py-4 px-6 whitespace-nowrap" colSpan={5}>
                No copies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center">
        <Button label="Add new copy" handleClick={handleAddNewCopy} type="neutral" />
      </div>
    </div>
  )
}

export default EditCopy
