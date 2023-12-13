import React, { useEffect, useState } from 'react'

import { validateSignUp } from '../../features/validation/validate'
import { Button, Card, CardBody, CardHeader, Input, Typography } from '@material-tailwind/react'
import { signUp } from '../../features/slices/authSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmedPassword, setConfirmedPassword] = useState<string>('')
  const [validationError, setValidationError] = useState<boolean | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleEmail = (email: string) => {
    if (validationError !== null) {
      setValidationError(null)
    }
    setEmail(email)
  }
  const handleName = (name: string) => {
    if (validationError !== null) {
      setValidationError(null)
    }
    setName(name)
  }
  const handlePassword = (pword: string) => {
    if (validationError !== null) {
      setValidationError(null)
    }
    setPassword(pword)
  }
  const handleConfirmPassword = (pword: string) => {
    if (validationError !== null) {
      setValidationError(null)
    }
    setConfirmedPassword(pword)
  }

  useEffect(() => {
    // When confirmedPassword is assigned, the validation is run.
    const hasError = validateSignUp(password, confirmedPassword)
    setValidationError(hasError)
  }, [confirmedPassword])

  const handleSubmit = async () => {
    if (validationError) {
      return
    }
    const request = {
      name: name,
      username: email,
      password: password
    }
    //await dispatch(signUp(request)).unwrap()
    navigate('/signUpComplete')
  }
  return (
    <section className="h-screen w-full p-4">
      <div className="relative h-[50vh] w-full overflow-hidden rounded-xl">
        <img
          src="/img/bookshelf.jpg"
          alt="background image"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-black/50" />
      </div>
      <div className="container mx-auto -mt-32 grid justify-center">
        <Card className="mx-4 md:w-[26rem]">
          <CardHeader color="gray" className="mb-4 grid place-items-center py-8 px-4 text-center">
            <Typography variant="h3" color="white" className="mb-2">
              Join us today!
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Typography color="gray" className="mt-2 flex items-center gap-1 font-normal">
              Create an account by filling the fields below:
            </Typography>
            <Input
              color="gray"
              label="Name"
              size="lg"
              onChange={(e) => handleName(e.target.value)}
            />
            <Input
              color="gray"
              label="Email"
              size="lg"
              onChange={(e) => handleEmail(e.target.value)}
            />
            <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center gap-1 font-normal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-px h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              Use at least 8 characters, one uppercase, one lowercase and one number.
            </Typography>
            <Input
              type="password"
              label="Password"
              onChange={(e) => handlePassword(e.target.value)}
            />
            <Input
              type="password"
              label="Repeat password"
              success={
                password.length > 1 &&
                confirmedPassword.length > 1 &&
                password === confirmedPassword
              }
              onChange={(e) => handleConfirmPassword(e.target.value)}
            />
            <Button
              color="gray"
              className="mt-4"
              fullWidth
              // The user can press button only if password and confirmed are validated
              disabled={validationError || validationError === null}
              onClick={() => handleSubmit()}>
              Sign up
            </Button>
          </CardBody>
        </Card>
      </div>
    </section>
  )
}

export default Signup
