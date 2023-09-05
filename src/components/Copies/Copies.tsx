import React, { useEffect, useState } from 'react'

import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import CopyWithAuth from '../CopyWithAuth/CopyWithAuth'
import CopyNoAuth from '../CopyNoAuth/CopyNoAuth'
import { borrowCopy, getCopies, returnCopy } from '../../features/slices/copySlice'
import { askConfirmation, finished } from '../../features/slices/modalSlice'
import { useNavigate } from 'react-router-dom'
import { CopiesProps } from '../../features/types/componentTypes'
import { Copy } from '../../features/types/reduxTypes'
import {
  CheckoutActionType,
  CheckoutBorrow,
  CheckoutReturn
} from '../../features/types/actionTypes'

function Copies({ bookId }: CopiesProps) {
  // Item to be borrowed or returned
  const [checkoutItem, setCheckoutItem] = useState<Copy | null>(null)
  // 'borrow' or 'return'
  const [checkoutType, setCheckoutType] = useState<CheckoutActionType | null>(null)

  const user = useSelector((state: RootState) => state.auth.items)
  const token = useSelector((state: RootState) => state.auth.token)
  const copies = useSelector((state: RootState) => state.copy.items)
  const modal = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    if (bookId) {
      dispatch(getCopies(bookId))
    }
  }, [])

  useEffect(() => {
    // When the user confirms the action in modal, borrow or return is excecuted.
    if (modal.status === 'confirmed' && checkoutType === 'borrow') {
      handleBorrow()
    } else if (modal.status === 'confirmed' && checkoutType === 'return') {
      handleReturn()
    }
  }, [modal.status])

  const handleCheckoutConfirmation = (checkoutObj: Copy, actionType: CheckoutActionType) => {
    //Action type defines is this a borrow or return of the book.
    setCheckoutItem(checkoutObj)
    setCheckoutType(actionType)
    dispatch(askConfirmation(`Are you sure you want to ${actionType} this book?`))
  }

  const handleBorrow = async () => {
    if (token !== null) {
      const checkoutData: CheckoutBorrow = {
        copyId: checkoutItem?.bookCopyId as string,
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

  const handleReturn = async () => {
    if (token !== null) {
      const checkoutData: CheckoutReturn = {
        checkoutId: checkoutItem?.latestCheckout?.id as string,
        copyId: checkoutItem?.bookCopyId as string,
        userId: user?.id
      }
      const req = {
        token: token,
        data: checkoutData
      }
      await dispatch(returnCopy(req)).unwrap()
      dispatch(finished('Book returned!'))
      navigate('/books')
    }
  }

  // If the user is logged in, the CopyWithAuth (with the possibility to borrow/return) will be rendered. If not CopyNoAuth will be shown.
  const isLoggedIn = user.role !== null ? true : false

  const showCopies = () => {
    if (isLoggedIn && copies !== null) {
      return copies.map((item: Copy, index: number) => (
        <CopyWithAuth
          key={item.bookCopyId}
          copy={item}
          copyOrderNumber={index + 1}
          onCheckout={handleCheckoutConfirmation}
        />
      ))
    } else if (!isLoggedIn && copies !== null) {
      return copies.map((item: Copy, index: number) => (
        <CopyNoAuth key={item.bookCopyId} copyOrderNumber={index + 1} copy={item} />
      ))
    } else {
      return <p key={'No data'}>No data about the copies available</p>
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-2xl text-center">Copies</h3>
      <div className="flex flex-col justify-around md:flex-row">{showCopies()}</div>
    </div>
  )
}

export default Copies
