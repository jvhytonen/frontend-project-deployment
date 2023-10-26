import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { logUserOut } from '../../features/slices/authSlice'
import { Card, CardBody, IconButton, Typography } from '@material-tailwind/react'

function Logout() {
  const dispatch = useDispatch<AppDispatch>()
  dispatch(logUserOut())
  return (
    <section>
      <div className="w-full px-4">
        <div className="grid h-screen place-items-center">
          <Card className=" max-w-xl">
            <CardBody className="w-full">
              <div className="flex w-full justify-center">
                <i className="fa-solid fa-check text-3xl text-gray-900"></i>
              </div>
              <Typography color="blue-gray" className="mb-6 mt-10 text-center" variant="h4">
                Logout complete!
              </Typography>
              <Typography
                variant="lead"
                className="text-center text-[20px] font-normal  leading-[30px] text-gray-500">
                Your have been successfully logged out. Thank you for being with us.
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Logout
