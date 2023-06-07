import React from 'react'

import { Checkout, CheckoutHandler } from '../../features/types/types'
import { formatDate } from '../../features/utils/helpers'
import Button from '../Button/Button'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { handleBorrow, handleReturn } from '../../features/copy/copySlice'

interface CopyProps {
  latestCheckout: Checkout | null
  copyOrderNumber: number
  copyId: string
}

function Copy({ latestCheckout, copyOrderNumber, copyId }: CopyProps) {
  const user = useSelector((state: RootState) => state.user.items)
  const dispatch = useDispatch<AppDispatch>()
  const handleCheckout = () => {
    const details = {
      copyId: copyId,
      userId: user?.id
    }
    if (latestCheckout === null || latestCheckout.returned) {
      dispatch(handleBorrow(details as CheckoutHandler))
    } else if (!latestCheckout.returned && latestCheckout.user.id === user?.id) {
      dispatch(handleReturn(details as CheckoutHandler))
    }
  }
  const isUserLogged = user !== null
  const isCopyFree = latestCheckout === null || latestCheckout.returned
  const isCopyBorrowed = !isCopyFree && latestCheckout !== null
  const isCopyBorrowedByUser = isCopyBorrowed && latestCheckout.user.id === user?.id

  const userLoggedCopyFree = isUserLogged && isCopyFree && (
    <Button label="Free - click to borrow" handleClick={handleCheckout} />
  )

  const userLoggedCopyBorrowed = isUserLogged && isCopyBorrowed && (
    <>Borrowed. Return date: {formatDate(latestCheckout!.endTime)}</>
  )

  const userLoggedAndBorrowed = isUserLogged && isCopyBorrowedByUser && (
    <Button label="Return book" handleClick={handleCheckout} />
  )

  return (
    <div className="flex">
      <p>Copy: {copyOrderNumber} &nbsp;&nbsp; </p>
      {isUserLogged
        ? isCopyFree
          ? userLoggedCopyFree
          : isCopyBorrowedByUser && userLoggedAndBorrowed
        : isCopyFree
        ? 'Free'
        : 'Borrowed.'}
      {isUserLogged && !isCopyBorrowedByUser && isCopyBorrowed && userLoggedCopyBorrowed}
    </div>
  )
}

export default Copy
