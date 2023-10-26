import React, { useEffect } from 'react'
import Button from '../../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { returnCopy } from '../../../features/slices/copySlice'
import { useNavigate } from 'react-router-dom'
import { ReturnProps } from '../../../features/types/componentTypes'
import { CheckoutReturn } from '../../../features/types/actionTypes'
import { openModal } from '../../../features/slices/modalSlice'

function Borrow({ copyId, checkoutId }: ReturnProps) {
  const user = useSelector((state: RootState) => state.auth.items)
  const token = useSelector((state: RootState) => state.auth.token)
  const modal = useSelector((state: RootState) => state.modal)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleReturn = async () => {
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

      navigate('/')
    }
  }

  useEffect(() => {
    if (modal.type === 'confirmed') {
      handleReturn()
    }
  }, [modal.type])
  return (
    <>
      <Button
        label="Return book"
        handleClick={(e) => {
          e.preventDefault()
          dispatch(
            openModal({
              heading: 'Confirm action',
              content: `Are you sure you want to return this book?`
            })
          )
        }}
        type="neutral"
      />
    </>
  )
}

export default Borrow
