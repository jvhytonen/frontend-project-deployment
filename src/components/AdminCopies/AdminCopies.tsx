import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { addNewCopy, deleteCopy, getCopies } from '../../features/slices/copySlice'
import Copy from '../CopyWithAuth/CopyWithAuth'
import Button from '../Button/Button'
import { TableCell, TableHeading, TableRow } from '../TableItems/TableItems'
import { useModal } from '../../features/hooks/useModal'
import AdminTable from '../AdminTable/AdminTable'
import Modal from '../Modal/Modal'
import { Checkout } from '../../features/types/types'
import { formatDate } from '../../features/utils/helpers'

function AdminCopies() {
  const {
    showConfirmation,
    showCompletion,
    confirmationText,
    handleConfirm,
    setShowConfirmation,
    setShowCompletion
  } = useModal()
  const [copyToBeDeleted, setCopyToBeDeleted] = useState<string | null>(null)
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.auth.token)
  const copies = useSelector((state: RootState) => state.copy)
  const book = useSelector((state: RootState) => state.book)
  // Item is the book related to the copies.
  const item = book.items ? book.items?.find((book) => params.id === book.id) : null

  const handleAddNewCopy = async () => {
    setShowConfirmation(false)
    if (item !== undefined && item !== null && item.id !== undefined && token !== null) {
      const postReq = {
        bookId: item?.id,
        token: token
      }
      await dispatch(addNewCopy(postReq)).unwrap()
      setShowCompletion(true)
    } else {
      return
    }
  }
  // In case the user don't want to add new category
  const handleCancel: () => void = () => {
    setShowConfirmation(false)
  }
  //When user clicks "ok" after successfull addition of category.
  const handleCompletionModalClosing: () => void = () => {
    setCopyToBeDeleted(null)
    setShowCompletion(false)
  }

  const handleDeleteCopy = async () => {
    setShowConfirmation(false)
    if (copyToBeDeleted !== undefined && copyToBeDeleted !== null && token !== null) {
      const deleteReq = {
        id: copyToBeDeleted,
        token: token
      }
      await dispatch(deleteCopy(deleteReq)).unwrap()
      setShowCompletion(true)
    } else {
      return
    }
  }
  const showStatus = (checkout: Checkout | null) => {
    if (checkout === null || checkout.returned) {
      return 'Free'
    } else {
      return 'Borrowed. Return date: ' + formatDate(checkout.endTime)
    }
  }
  useEffect(() => {
    if (params.id) {
      dispatch(getCopies(params.id))
    }
  }, [])
  // Headers used in this table
  const headers = ['Copy-id', 'Status', 'Actions']
  const rows =
    copies.items !== null && copies.items.length > 0
      ? copies.items.map((copy) => {
          return (
            <TableRow key={copy.bookCopyId}>
              <TableCell>{copy.bookCopyId}</TableCell>
              <TableCell>{showStatus(copy.latestCheckout)}</TableCell>
              <TableCell>
                <Button
                  label="Delete copy"
                  handleClick={(e) => {
                    setCopyToBeDeleted(copy.bookCopyId)
                    handleConfirm(
                      e,
                      `Are you sure you want to delete copy of "${item?.title}" with id "${copy.bookCopyId}"`
                    )
                  }}
                  type="delete"
                />
              </TableCell>
            </TableRow>
          )
        })
      : [
          <TableRow key={0}>
            <TableCell>No copies found.</TableCell>
          </TableRow>
        ]
  return (
    <>
      <h2>Edit copies: </h2>
      <h3>{item?.title}</h3>
      <h3>ISBN: {item?.isbn}</h3>
      <AdminTable headers={headers} rows={rows} />
      <div className="flex justify-center">
        <Button
          label="Add copy to the book"
          handleClick={(e) =>
            handleConfirm(e, `Are you sure you want to add new copy to "${item?.title}"`)
          }
          type="neutral"
        />
      </div>
      {/* When adding copy */}
      {/* Modal to ask confirmation from the user. */}
      {showConfirmation && copyToBeDeleted === null ? (
        <Modal
          type="confirm"
          heading={'Confirm adding new copy'}
          text={confirmationText}
          onConfirm={handleAddNewCopy}
          onCancel={handleCancel}
        />
      ) : null}
      {/* Modal to show that the operation was succesfull. */}
      {showCompletion && copyToBeDeleted === null ? (
        <Modal
          type="success"
          heading={'New copy added'}
          text={`New copy of "${item?.title}" added.`}
          onConfirm={handleCompletionModalClosing}
        />
      ) : null}
      {/* When deleting copy */}
      {showConfirmation && copyToBeDeleted !== null ? (
        <Modal
          type="confirm"
          heading={'Confirm deleting copy'}
          text={confirmationText}
          onConfirm={handleDeleteCopy}
          onCancel={handleCancel}
        />
      ) : null}
      {/* Modal to show that the operation was succesfull. */}
      {showCompletion && copyToBeDeleted !== null ? (
        <Modal
          type="success"
          heading={'Copy deleted'}
          text={`Copy "${copyToBeDeleted}" deleted`}
          onConfirm={handleCompletionModalClosing}
        />
      ) : null}
    </>
  )
}

export default AdminCopies
