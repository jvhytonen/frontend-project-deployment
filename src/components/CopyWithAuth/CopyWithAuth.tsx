import React from 'react'

import { CheckoutBorrow, CheckoutReturn, CopyProps } from '../../features/types/types'
import { formatDate } from '../../features/utils/helpers'
import Button from '../Button/Button'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { borrowCopy, returnCopy } from '../../features/slices/copySlice'
import { useModal } from '../../features/hooks/useModal'
import Modal from '../Modal/Modal'
import Borrow from '../Borrow/Borrow'
import Return from '../Return/Return'

function CopyWithAuth({ latestCheckout, copyOrderNumber, copyId }: CopyProps) {
  const {
    showConfirmation,
    showCompletion,
    confirmationText,
    handleConfirm,
    setShowConfirmation,
    setShowCompletion
  } = useModal()
  const user = useSelector((state: RootState) => state.auth.items)

  const showCopyStatus = () => {
    // This will find out if the copy is free, borrowed by someone or borrowed by user, content is rendered based on that
    const copyIsFree = latestCheckout === null || latestCheckout.returned
    const copyIsBorrowedBySomeone = !copyIsFree && latestCheckout !== null
    const copyIsBorrowedByUser = copyIsBorrowedBySomeone && latestCheckout.user.id === user?.id
    if (copyIsFree) {
      return <Borrow copyId={copyId} />
    } else if (copyIsBorrowedByUser) {
      return <Return copyId={copyId} checkoutId={latestCheckout.id} />
    } else if (copyIsBorrowedBySomeone) {
      return <>Borrowed. Return date: {formatDate(latestCheckout!.endTime)}</>
    }
  }

  return (
    <div className="flex">
      <p>Copy: {copyOrderNumber} &nbsp;&nbsp; </p>
      {showCopyStatus()}
    </div>
  )
}

export default CopyWithAuth
