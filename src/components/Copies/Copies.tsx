import React, { useEffect } from 'react'
import { CopiesProps } from '../../features/types/types'
import Copy from '../CopyWithAuth/CopyWithAuth'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import CopyWithAuth from '../CopyWithAuth/CopyWithAuth'
import CopyNoAuth from '../CopyNoAuth/CopyNoAuth'
import { getCopies } from '../../features/slices/copySlice'

function Copies({ bookId }: CopiesProps) {
  const user = useSelector((state: RootState) => state.auth.items)
  const copies = useSelector((state: RootState) => state.copy.items)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (bookId) {
      dispatch(getCopies(bookId))
    }
  }, [])
  // If the user is logged in, the CopyWithAuth will be rendered. If not CopyNoAuth will be shown.
  const isLoggedIn = user.role !== null ? true : false

  const showCopies = () => {
    if (isLoggedIn && copies !== null) {
      return copies.map((copy, index) => (
        <CopyWithAuth
          key={copy.bookCopyId}
          latestCheckout={copy.latestCheckout ? copy.latestCheckout : null}
          copyOrderNumber={index + 1}
          copyId={copy.bookCopyId}
        />
      ))
    } else if (!isLoggedIn && copies !== null) {
      return copies.map((copy, index) => (
        <CopyNoAuth
          key={copy.bookCopyId}
          latestCheckout={copy.latestCheckout ? copy.latestCheckout : null}
          copyOrderNumber={index + 1}
          copyId={copy.bookCopyId}
        />
      ))
    } else {
      return <p>No data about the copies available</p>
    }
  }

  return (
    <>
      <h3>Copies</h3>
      {showCopies()}
    </>
  )
}

export default Copies
