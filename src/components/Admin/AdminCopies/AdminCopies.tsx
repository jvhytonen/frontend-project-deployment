import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

import { addNewCopy, getCopies } from '../../../features/slices/copySlice'
import { Book } from '../../../features/types/reduxTypes'
import { Button, Card, Typography } from '@material-tailwind/react'
import TableHeading from '../TableHeading/TableHeading'
import DeleteItem from '../DeleteItem/DeleteItem'
import { finished, openModal } from '../../../features/slices/modalSlice'

function AdminCopies() {
  const [isAddingNewCopy, setIsAddingNewCopy] = useState<boolean>(false)
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.auth.token)
  const copies = useSelector((state: RootState) => state.copy.items)
  const modal = useSelector((state: RootState) => state.modal)
  const book = useSelector((state: RootState) => state.book)
  // Item is the book related to the copies.
  const item = book.items ? book.items?.find((book: Book) => params.id === book.id) : null

  const handleAddNewCopy = async () => {
    if (item !== undefined && item !== null && item.id !== undefined && token !== null) {
      const postReq = {
        bookId: item?.id,
        token: token
      }
      await dispatch(addNewCopy(postReq)).unwrap()
      dispatch(finished({ heading: 'Success!', content: 'Copy added' }))
      setIsAddingNewCopy(false)
    } else {
      return
    }
  }

  useEffect(() => {
    if (modal.type === 'confirmed' && isAddingNewCopy) {
      handleAddNewCopy()
    }
  }, [modal.type])

  useEffect(() => {
    if (params.id) {
      dispatch(getCopies(params.id))
    }
  }, [])
  const headers = ['Copy Id', 'Delete']
  const rows = (
    <tbody>
      {copies !== null ? (
        copies.map((copy, index) => {
          const isLast = index === copies.length - 1
          const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

          return (
            <tr key={copy.id}>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {copy.id}
                </Typography>
              </td>
              {/*/ All delete-logic will be handled in separate component */}
              <td className={classes}>
                {copy.latestCheckout === null || copy.latestCheckout?.returned ? (
                  <DeleteItem feature={'copies'} item={copy} />
                ) : (
                  <Typography variant="small" color="red" className="font-normal">
                    Borrowed. Cannot be deleted before the book is returned.
                  </Typography>
                )}
              </td>
            </tr>
          )
        })
      ) : (
        <tr>
          <td className="p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
              No data
            </Typography>
          </td>
        </tr>
      )}
    </tbody>
  )

  return (
    <Card className="h-full w-full">
      <table className="w-full h-[50%] table-auto text-left">
        <thead>
          <tr>
            {headers.map((heading) => {
              return <TableHeading key={heading} label={heading} />
            })}
          </tr>
        </thead>
        {rows}
      </table>
      <div className="flex items-center justify-center">
        <Button
          className="flex items-center gap-3"
          size="sm"
          onClick={() => {
            dispatch(
              openModal({
                heading: 'Confirm action',
                content: `Are you sure you want to add new copy to this book?`
              })
            )
            setIsAddingNewCopy(true)
          }}>
          <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> Add new
        </Button>
      </div>
    </Card>
  )
}

export default AdminCopies
