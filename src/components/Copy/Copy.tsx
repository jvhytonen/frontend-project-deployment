import React from 'react'

import { Checkout, CheckoutData } from '../../features/types/types'
import { formatDate } from '../../features/utils/helpers'
import Button from '../Button/Button'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { borrowCopy, returnCopy } from '../../features/slices/copySlice'
import { useModal } from '../../features/hooks/useModal'
import Modal from '../Modal/Modal'

interface CopyProps {
  latestCheckout: Checkout | null
  copyOrderNumber: number
  copyId: string
}

function Copy({ latestCheckout, copyOrderNumber, copyId }: CopyProps) {
  const {
    showConfirmation,
    showCompletion,
    confirmationText,
    handleConfirm,
    setShowConfirmation,
    setShowCompletion
  } = useModal()
  const user = useSelector((state: RootState) => state.user.items)
  const token = useSelector((state: RootState) => state.auth.token)
  const dispatch = useDispatch<AppDispatch>()

  // In case the user don't want to add new category
  const handleCancel: () => void = () => {
    setShowConfirmation(false)
  }
  //When user clicks "ok" after successfull addition of category.
  const handleCompletionModalClosing: () => void = () => {
    setShowCompletion(false)
  }
  const handleCheckout = () => {
    if (token !== null) {
      const checkoutData: CheckoutData = {
        copyId: copyId,
        userId: user?.id
      }
      const req = {
        token: token,
        body: checkoutData
      }
      if (latestCheckout === null || latestCheckout.returned) {
        dispatch(borrowCopy(req))
      } else if (!latestCheckout.returned && latestCheckout.user.id === user?.id) {
        dispatch(returnCopy(req))
      }
    }
  }
  const isUserLogged = user !== null
  const isCopyFree = latestCheckout === null || latestCheckout.returned
  const isCopyBorrowed = !isCopyFree && latestCheckout !== null
  const isCopyBorrowedByUser = isCopyBorrowed && latestCheckout.user.id === user?.id

  const userLoggedCopyFree = isUserLogged && isCopyFree && (
    <Button
      label="Free - click to borrow"
      handleClick={(e) => handleConfirm(e, `Are you sure you want to borrow book ?`)}
      type="neutral"
    />
  )

  const userLoggedCopyBorrowed = isUserLogged && isCopyBorrowed && (
    <>Borrowed. Return date: {formatDate(latestCheckout!.endTime)}</>
  )

  const userLoggedAndBorrowed = isUserLogged && isCopyBorrowedByUser && (
    <Button
      label="Return book"
      handleClick={(e) => handleConfirm(e, `Are you sure you want to return the book ?`)}
      type="neutral"
    />
  )

  return (
    <>
      <div className="flex">
        <p>Copy: {copyOrderNumber} &nbsp;&nbsp; </p>
        {isUserLogged
          ? isCopyFree
            ? userLoggedCopyFree + copyId
            : isCopyBorrowedByUser && userLoggedAndBorrowed
          : isCopyFree
          ? 'Free'
          : 'Borrowed.'}
        {isUserLogged && !isCopyBorrowedByUser && isCopyBorrowed && userLoggedCopyBorrowed}
      </div>
      {/* Modal to ask confirmation from the user. */}
      {showConfirmation && (
        <Modal
          type="confirm"
          heading={'Borrow book'}
          text={confirmationText}
          onConfirm={handleCheckout}
          onCancel={handleCancel}
        />
      )}
      {/* Modal to show that the operation was succesfull. */}
      {showCompletion && (
        <Modal
          type="success"
          heading={'Book borrowed'}
          text={`You have borrowed a book`}
          onConfirm={handleCompletionModalClosing}
        />
      )}
    </>
  )
}

export default Copy
