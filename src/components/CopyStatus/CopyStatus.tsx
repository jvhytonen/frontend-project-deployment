import { Chip, Typography } from '@material-tailwind/react'

import { CopyStatusProps } from '../../features/types/componentTypes'

export default function CopyStatus({ copyItem }: CopyStatusProps) {
  return (
    <Typography variant="small" color="blue-gray" className="font-normal">
      <Chip
        size="sm"
        variant="ghost"
        value={
          copyItem.latestCheckout === undefined
            ? 'Free'
            : copyItem.latestCheckout === null
            ? 'Free'
            : copyItem.latestCheckout.returned
            ? 'Free'
            : 'Borrowed'
        }
        color={
          copyItem.latestCheckout === undefined
            ? 'green'
            : copyItem.latestCheckout === null
            ? 'green'
            : copyItem.latestCheckout.returned
            ? 'green'
            : 'red'
        }
      />
    </Typography>
  )
}
