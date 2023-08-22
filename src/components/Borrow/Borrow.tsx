import React, { useEffect } from 'react'
import Button from '../Button/Button'
import { useModal } from '../../features/hooks/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { BorrowProps, CheckoutBorrow } from '../../features/types/types'
import { borrowCopy } from '../../features/slices/copySlice'
import Modal from '../Modal/Modal'
import { useNavigate } from 'react-router-dom'
import { askConfirmation, finished } from '../../features/slices/modalSlice'
import { addNewCategory } from '../../features/slices/categorySlice'

function Borrow({ copyId }: BorrowProps) {
  const user = useSelector((state: RootState) => state.auth.items)
  const token = useSelector((state: RootState) => state.auth.token)
  const modal = useSelector((state: RootState) => state.modal)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (modal.status === 'confirmed') {
      handleBorrow()
    }
  }, [modal.status])

  const handleBorrow = async () => {
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
      dispatch(finished('Book borrowed!'))
      navigate('/books')
    }
  }
  return (
    <>
      <Button
        label="Add category"
        handleClick={(e) => {
          e.preventDefault()
          dispatch(askConfirmation(`Are you sure you want to this book?`))
        }}
        type="neutral"
      />
    </>
  )
}

export default Borrow
