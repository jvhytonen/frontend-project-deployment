import { useEffect } from 'react'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { CopiesProps } from '../../features/types/componentTypes'
import { Copy } from '../../features/types/reduxTypes'
import { Card, Typography } from '@material-tailwind/react'

import CopyStatus from '../CopyStatus/CopyStatus'
import CopyActions from '../CopyActions/CopyActions'
import { getCopies } from '../../features/slices/copySlice'

function Copies({ bookId }: CopiesProps) {
  const copies = useSelector((state: RootState) => state.copy.items)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (bookId) {
      dispatch(getCopies(bookId))
    }
  }, [])

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
                      {/* Own component to show if the copy is borrowed or free */}
                      <CopyStatus copyItem={item} />
                    </td>
                    {/* Action buttons in their own component */}
                    <CopyActions copyItem={item} classes={classes} />
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
