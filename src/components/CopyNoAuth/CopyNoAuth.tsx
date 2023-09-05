import { CopyPropsNoAuth } from '../../features/types/componentTypes'
import { formatDate } from '../../features/utils/helpers'

function CopyNoAuth({ copyOrderNumber, copy }: CopyPropsNoAuth) {
  return (
    <div className="flex">
      <p>Copy: {copyOrderNumber} &nbsp;&nbsp; </p>
      <p>
        {copy.latestCheckout === null || copy.latestCheckout.returned
          ? 'Free'
          : 'Borrowed, return date: ' + formatDate(copy.latestCheckout.endTime)}
      </p>
    </div>
  )
}

export default CopyNoAuth
