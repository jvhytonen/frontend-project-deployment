import React from 'react'
import { CopyProps } from '../../features/types/types'
import { formatDate } from '../../features/utils/helpers'

function CopyNoAuth({ latestCheckout, copyOrderNumber }: CopyProps) {
  return (
    <div className="flex">
      <p>Copy: {copyOrderNumber} &nbsp;&nbsp; </p>
      <p>
        {latestCheckout === null || latestCheckout.returned
          ? 'Free'
          : 'Borrowed, return date: ' + formatDate(latestCheckout.endTime)}
      </p>
    </div>
  )
}

export default CopyNoAuth
