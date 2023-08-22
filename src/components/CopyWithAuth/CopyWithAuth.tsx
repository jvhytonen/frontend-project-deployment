import { CopyProps } from '../../features/types/types'
import { formatDate } from '../../features/utils/helpers'
import Button from '../Button/Button'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'

function CopyWithAuth({ copy, copyOrderNumber, onCheckout }: CopyProps) {
  const user = useSelector((state: RootState) => state.auth.items)

  const showCopyStatus = () => {
    // This will find out if the copy is free, borrowed by someone or borrowed by user, content is rendered based on that
    const copyIsFree =
      copy.latestCheckout === null ||
      copy.latestCheckout === undefined ||
      copy.latestCheckout.returned
    const copyIsBorrowedBySomeone = !copyIsFree && copy.latestCheckout !== null
    const copyIsBorrowedByUser =
      copyIsBorrowedBySomeone &&
      copy.latestCheckout !== null &&
      copy.latestCheckout.user.id === user?.id
    if (copyIsFree) {
      return (
        <Button
          key={copy.bookCopyId}
          label="Borrow"
          handleClick={(e) => {
            e.preventDefault()
            onCheckout(copy, 'borrow')
          }}
          type="neutral"
        />
      )
    } else if (copyIsBorrowedByUser) {
      return (
        <Button
          key={copy.bookCopyId}
          label="Return"
          handleClick={(e) => {
            e.preventDefault()
            onCheckout(copy, 'return')
          }}
          type="neutral"
        />
      )
    } else if (copyIsBorrowedBySomeone) {
      return (
        <p key={copy.bookCopyId}>
          Borrowed. Return date: {formatDate(copy.latestCheckout?.endTime as string)}
        </p>
      )
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
