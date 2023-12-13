import { Card, CardBody, IconButton, Typography } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/24/outline'

function SignUpComplete() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirecting to login after 4 seconds
    const redirectTimeout = setTimeout(() => {
      navigate('/login')
    }, 4000)

    // Clear the timeout when the redirect happens
    return () => clearTimeout(redirectTimeout)
  }, [navigate])
  return (
    <section>
      <div className="w-full px-4">
        <div className="grid h-screen place-items-center">
          <Card className=" max-w-xl">
            <CardBody className="w-full">
              <div className="flex w-full justify-center">
                <CheckIcon className="h-16 w-16" />
              </div>
              <Typography color="blue-gray" className="mb-6 mt-10 text-center" variant="h4">
                SignUp Complete!
              </Typography>
              <Typography
                variant="lead"
                className="text-center text-[20px] font-normal  leading-[30px] text-gray-500">
                Welcome to our library! We hope you will experience unforgettable experiences with
                us!
              </Typography>
              <Typography
                variant="lead"
                className="my-6 text-center text-[20px] font-normal leading-[30px] text-gray-500 ">
                No please{' '}
                <Link to="/login">
                  <span className="text-blue underline">login</span>
                </Link>
                &nbsp;by with your email and newly created password.
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default SignUpComplete
