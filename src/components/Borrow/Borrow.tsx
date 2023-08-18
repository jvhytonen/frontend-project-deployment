import React from 'react'
import Button from '../Button/Button'
import { useModal } from '../../features/hooks/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { BorrowProps, CheckoutBorrow } from '../../features/types/types'
import { borrowCopy } from '../../features/slices/copySlice'
import Modal from '../Modal/Modal'
import { useNavigate } from 'react-router-dom'

function Borrow({ copyId }: BorrowProps) {
  const user = useSelector((state: RootState) => state.auth.items)
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  const {
    showConfirmation,
    showCompletion,
    confirmationText,
    handleConfirm,
    setShowConfirmation,
    setShowCompletion
  } = useModal()
  const dispatch = useDispatch<AppDispatch>()
  // In case the user don't want to do the action
  const handleCancel: () => void = () => {
    setShowConfirmation(false)
  }
  //When user clicks "ok" after successfull action
  const handleCompletionModalClosing: () => void = () => {
    setShowCompletion(false)
  }
  const handleBorrow = async () => {
    setShowConfirmation(false)
    if (token !== null) {
      const checkoutData: CheckoutBorrow = {
        copyId: copyId as string,
        userId: user?.id
      }
      const req = {
        token: token,
        data: checkoutData
      }
      await dispatch(borrowCopy(req)).unwrap()
      setShowCompletion(true)
      navigate('/')
    }
  }
  return (
    <>
      <Button
        label="Free - click to borrow"
        handleClick={(e) => handleConfirm(e, `Do you want to borrow this book?`)}
        type="neutral"
      />
      {/* Modal to ask confirmation from the user. */}
      {showConfirmation && (
        <Modal
          type="confirm"
          heading={'Borrow book'}
          text={confirmationText}
          onConfirm={handleBorrow}
          onCancel={handleCancel}
        />
      )}
      {/* Modal to show that the operation was succesfull. */}
      {showCompletion && (
        <Modal
          type="success"
          heading={'Book borrowed'}
          text={`Borrow completed`}
          onConfirm={handleCompletionModalClosing}
        />
      )}
    </>
  )
}

export default Borrow
