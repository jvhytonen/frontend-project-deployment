import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@material-tailwind/react'

import { CopyActionsProps } from '../../features/types/componentTypes'
import { Copy } from '../../features/types/reduxTypes'
import { CheckoutBorrow, CheckoutReturn } from '../../features/types/actionTypes'
import { AppDispatch, RootState } from '../../store'
import { finished } from '../../features/slices/modalSlice'
import { borrowCopy, returnCopy } from '../../features/slices/copySlice'
import { formatDate } from '../../features/utils/helpers'

function CopyActions({ copyItem, classes }: CopyActionsProps) {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.auth.items) // Is user logged in.
  const isLoggedIn = user.role !== null ? true : false // The role is stored in Redux after successfull login.
  const token = useSelector((state: RootState) => state.auth.token) // Authentication token needed to borrow and return copies.
  const copies = useSelector((state: RootState) => state.copy.items)

  const navigate = useNavigate()

  const handleBorrow = async (checkoutItem: Copy) => {
    // Data needed to borrow: copyId and userId
    if (token !== null) {
      const checkoutData: CheckoutBorrow = {
        copyId: checkoutItem?.id as string,
        userId: user?.id
      }
      // Request needs token and data
      const req = {
        token: token,
        data: checkoutData
      }
      // Send data to redux to implement the action.
      await dispatch(borrowCopy(req)).unwrap()
      // We want to show return date when Modal opens for succesfull checkout.
      const returnDate = getReturnDate(checkoutItem)
      // After successfull action modal with success text will be shown.
      dispatch(
        finished({
          heading: 'Success',
          content: 'Book borrowed. Return date ' + formatDate(returnDate as string)
        })
      )
      navigate('/books')
    }
  }

  const handleReturn = async (checkoutItem: Copy) => {
    // Data needed to return: checkoutId, copyId and userId
    if (token !== null) {
      const checkoutData: CheckoutReturn = {
        checkoutId: checkoutItem?.latestCheckout?.id as string,
        copyId: checkoutItem?.id as string,
        userId: user?.id
      }
      // Request needs token and data
      const req = {
        token: token,
        data: checkoutData
      }
      // Send data to redux to implement the action.
      await dispatch(returnCopy(req)).unwrap()
      // After successfull action modal with success text will be shown.
      dispatch(
        finished({
          heading: 'Success',
          content: 'Book returned'
        })
      )
      navigate('/books')
    }
  }

  const getReturnDate = (borrowedCopy: Copy) => {
    // We must find the new return date of the borrowed copy.
    const updatedCopy = copies?.find((item) => item.id === borrowedCopy.id)
    return updatedCopy?.latestCheckout?.endTime
  }

  // Logic to find out if the copy is available or not.
  const copyStatus = !isLoggedIn
    ? 'notLoggedIn'
    : isLoggedIn &&
      (copyItem.latestCheckout === null ||
        copyItem.latestCheckout === undefined ||
        copyItem.latestCheckout.returned)
    ? 'free'
    : isLoggedIn &&
      copyItem.latestCheckout !== null &&
      copyItem.latestCheckout.user.id === user.id &&
      !copyItem.latestCheckout.returned
    ? 'borrowedByUser'
    : isLoggedIn &&
      copyItem.latestCheckout !== null &&
      copyItem.latestCheckout.user.id !== user.id &&
      !copyItem.latestCheckout.returned
    ? 'borrowedBySomeone'
    : null

  // Switch-case to render correct text or button.
  let copyAction
  switch (copyStatus) {
    // If the user is not logged in, plain text will be shown
    case 'notLoggedIn':
      copyAction = 'Log in to borrow or return books'
      break
    // Free books can be borrowed,
    case 'free':
      copyAction = (
        <Button onClick={() => handleBorrow(copyItem)} color="green">
          Borrow
        </Button>
      )
      break
    // Books borrowed by the user can be returned
    case 'borrowedByUser':
      copyAction = (
        <Button
          onClick={() => {
            handleReturn(copyItem)
          }}
          color="lime">
          Return
        </Button>
      )
      break
    // Only return date will be shown if someone else has borrowed the book.
    case 'borrowedBySomeone':
      copyAction = 'Return date ' + formatDate(copyItem.latestCheckout?.endTime as string)
      break
  }

  return (
    <td className={classes}>
      <Typography variant="small" color="blue-gray" className="font-normal">
        {copyAction}
      </Typography>
    </td>
  )
}

export default CopyActions
