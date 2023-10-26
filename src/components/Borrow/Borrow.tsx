import React, { useEffect } from 'react'
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { borrowCopy } from '../../features/slices/copySlice'
import { useNavigate } from 'react-router-dom'
import { finished, openErrorModal, openModal } from '../../features/slices/modalSlice'
import { BorrowProps } from '../../features/types/componentTypes'
import { CheckoutBorrow } from '../../features/types/actionTypes'

function Borrow({ copyId }: BorrowProps) {
  const user = useSelector((state: RootState) => state.auth.items)
  const token = useSelector((state: RootState) => state.auth.token)
  const modal = useSelector((state: RootState) => state.modal)
  const error = useSelector((state: RootState) => state.copy.error)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (modal.type === 'confirmed') {
      handleBorrow()
    }
  }, [modal.type])

  const handleBorrow = async () => {
    /* We send copyId and userId to the backend. */
    if (token !== null) {
      const checkoutData: CheckoutBorrow = {
        copyId: copyId as string,
        userId: user?.id
      }
      /* And the token */
      const req = {
        token: token,
        data: checkoutData
      }
      try {
        /* In case of fullfilled action in the slice a modal with success message will be shown. */
        await dispatch(borrowCopy(req)).unwrap()
        dispatch(finished({ heading: 'Success', content: 'Book borrowed!' }))
        navigate('/books')
      } catch (err) {
        /* In case of rejected action in the slice the error message will be shown.  */
        dispatch(openErrorModal({ heading: 'An error!', content: error }))
      }
    }
  }
  return (
    <>
      <Button
        label="Add category"
        handleClick={(e) => {
          e.preventDefault()
          dispatch(
            openModal({
              heading: 'Confirm action',
              content: `Are you sure you want to borrow this book?`
            })
          )
        }}
        type="neutral"
      />
    </>
  )
}

export default Borrow
