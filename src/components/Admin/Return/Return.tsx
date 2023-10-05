import React from 'react'
import Button from '../../Button/Button'
import { useModal } from '../../../features/hooks/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { returnCopy } from '../../../features/slices/copySlice'
import Modal from '../../Modal/Modal'
import { useNavigate } from 'react-router-dom'
import { ReturnProps } from '../../../features/types/componentTypes'
import { CheckoutReturn } from '../../../features/types/actionTypes'

function Borrow({ copyId, checkoutId }: ReturnProps) {
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
  const handleReturn = async () => {
    setShowConfirmation(false)
    if (token !== null) {
      const checkoutData: CheckoutReturn = {
        checkoutId: checkoutId,
        copyId: copyId as string,
        userId: user?.id
      }
      const req = {
        token: token,
        data: checkoutData
      }
      await dispatch(returnCopy(req)).unwrap()
      setShowCompletion(true)
      navigate('/')
    }
  }
  return (
    <>
      <Button
        label="Return book"
        handleClick={(e) => {
          console.log('Button')
          handleConfirm(e, `Do you want to return this book?`)
        }}
        type="neutral"
      />
      {/* Modal to ask confirmation from the user. */}
      {showConfirmation && (
        <Modal
          type="confirm"
          heading={'Return book'}
          text={confirmationText}
          onConfirm={handleReturn}
          onCancel={handleCancel}
        />
      )}
      {/* Modal to show that the operation was succesfull. */}
      {showCompletion && (
        <Modal
          type="success"
          heading={'Book returned'}
          text={`Return completed`}
          onConfirm={handleCompletionModalClosing}
        />
      )}
    </>
  )
}

export default Borrow
