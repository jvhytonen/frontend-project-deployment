import React, { useEffect, useState } from 'react'

import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { borrowCopy, getCopies, returnCopy } from '../../features/slices/copySlice'
import { finished, openModal } from '../../features/slices/modalSlice'
import { useNavigate } from 'react-router-dom'
import { CopiesProps } from '../../features/types/componentTypes'
import { Copy } from '../../features/types/reduxTypes'
import {
  CheckoutActionType,
  CheckoutBorrow,
  CheckoutReturn
} from '../../features/types/actionTypes'
import { Button, Card, Chip, Typography } from '@material-tailwind/react'
import { formatDate } from '../../features/utils/helpers'

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
    if (modal.type === 'confirmed' && checkoutType === 'borrow') {
      handleBorrow()
    } else if (modal.type === 'confirmed' && checkoutType === 'return') {
      handleReturn()
    }
  }, [modal.type])

  const handleCheckoutConfirmation = (checkoutObj: Copy, actionType: CheckoutActionType) => {
    //Action type defines is this a borrow or return of the book.
    setCheckoutItem(checkoutObj)
    setCheckoutType(actionType)
    dispatch(
      openModal({
        heading: 'Confirm action',
        content: `Are you sure you want to ${actionType} this book?`
      })
    )
  }

  const handleBorrow = async () => {
    if (token !== null) {
      const checkoutData: CheckoutBorrow = {
        copyId: checkoutItem?.id as string,
        userId: user?.id
      }
      const req = {
        token: token,
        data: checkoutData
      }
      await dispatch(borrowCopy(req)).unwrap()
      dispatch(
        finished({
          heading: 'Success',
          content: 'Book borrowed'
        })
      )
      navigate('/books')
    }
  }

  const handleReturn = async () => {
    if (token !== null) {
      const checkoutData: CheckoutReturn = {
        checkoutId: checkoutItem?.latestCheckout?.id as string,
        copyId: checkoutItem?.id as string,
        userId: user?.id
      }
      const req = {
        token: token,
        data: checkoutData
      }
      await dispatch(returnCopy(req)).unwrap()
      dispatch(
        finished({
          heading: 'Success',
          content: 'Book returned'
        })
      )
      navigate('/books')
    }
  }

  // If the user is logged in, the CopyWithAuth (with the possibility to borrow/return) will be rendered. If not CopyNoAuth will be shown.
  const isLoggedIn = user.role !== null ? true : false

  const CopiesTable = () => {
    return (
      <Card className="h-full w-[80%] overflow-scroll flex justify-center">
        <table className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
          <thead>
            <tr>
              <th className="w-[5%] border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 text-left">
                  Copy number
                </Typography>
              </th>
              <th className="w-[50%] border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 text-left">
                  Status
                </Typography>
              </th>
              <th className="w-[45%] border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 text-left">
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {copies !== null ? (
              copies.map((item: Copy, index: number) => {
                const isLast = index === copies.length - 1
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={
                            item.latestCheckout === null
                              ? 'Free'
                              : item.latestCheckout.returned
                              ? 'Free'
                              : 'Borrowed. Return date: ' + formatDate(item.latestCheckout.endTime)
                          }
                          color={
                            item.latestCheckout === null
                              ? 'green'
                              : item.latestCheckout.returned
                              ? 'green'
                              : 'red'
                          }
                        />
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {/* User can borrow the copy if it has never been borrowed before */}
                        {isLoggedIn && item.latestCheckout === null ? (
                          <Button
                            onClick={() => handleCheckoutConfirmation(item, 'borrow')}
                            color="green">
                            Borrow
                          </Button>
                        ) : /* Or it is returned by the previous borrower */
                        item.latestCheckout != null && item.latestCheckout.returned ? (
                          <Button
                            onClick={() => handleCheckoutConfirmation(item, 'borrow')}
                            color="green">
                            Borrow
                          </Button>
                        ) : item.latestCheckout != null &&
                          item.latestCheckout.user.id === user.id ? (
                          /* User can return the copy if she has borrowed it */
                          <Button
                            onClick={() => handleCheckoutConfirmation(item, 'return')}
                            color="amber">
                            Return
                          </Button>
                        ) : item.latestCheckout !== null &&
                          /* No text (null) is shown if someone else has borrowed it, if the user is not logged in, she will be insisted to do so. */
                          item.latestCheckout.user.id !== user.id ? null : (
                          'Log in to borrow or return books'
                        )}
                      </Typography>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    No copies
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    )
  }

  return (
    <div className="w-full flex justify-center">
      {copies?.length === 0 ? <Typography>No copies</Typography> : <CopiesTable />}
    </div>
  )
}

export default Copies
