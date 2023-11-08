import { TableBodyProps } from '../../../features/types/componentTypes'
import { IconButton, Tooltip, Typography } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import { PencilIcon } from '@heroicons/react/24/outline'
import DeleteItem from '../DeleteItem/DeleteItem'

export function TableBody({ items, feature }: TableBodyProps) {
  const navigate = useNavigate()

  return (
    <tbody>
      {items !== null ? (
        items.map((item, index) => {
          const isLast = index === items!.length - 1
          const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

          return (
            <tr key={item.id}>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {item.name}
                </Typography>
              </td>
              {/* Variable feature can be books, authors or categories so it navigates to correct Edit-component */}
              <td className={classes}>
                <Tooltip onClick={() => navigate(`../${feature}/edit/${item.id}`)} content="Edit">
                  <IconButton variant="text">
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                </Tooltip>
              </td>
              {/*/ All delete-logic will be handled in separate component */}
              <td className={classes}>
                <DeleteItem feature={feature} item={item} />
              </td>
            </tr>
          )
        })
      ) : (
        <tr>
          <td className="p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
              No data
            </Typography>
          </td>
        </tr>
      )}
    </tbody>
  )
}
