import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../store'
import { login, nullifyAuthError } from '../../features/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Input, Typography } from '@material-tailwind/react'

function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const [userName, setUserName] = useState<string | null>(null)
  const [passWord, setPassWord] = useState<string | null>(null)
  const [authenticationCompleted, setAuthenticationCompleted] = useState<boolean>(false)
  const navigate = useNavigate()
  const role = useSelector((state: RootState) => state.auth.items.role)
  const error = useSelector((state: RootState) => state.auth.error)

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassWord(event.target.value)
  }

  const handleUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  const handleSubmit = async () => {
    // We must make error null if the user has tried to unsuccessfully log in before.
    if (error) {
      dispatch(nullifyAuthError())
    }
    if (userName && passWord) {
      const credentials = {
        username: userName,
        password: passWord
      }

      try {
        //Unwrap will return a promise. Necessary for error handling.
        await dispatch(login(credentials)).unwrap()
        setAuthenticationCompleted(true)
      } catch (error) {
        return
      }
    }
  }
  useEffect(() => {
    if (authenticationCompleted) {
      if (role === 'ADMIN') {
        navigate('../admin/dashboard')
      } else if (role === 'USER') {
        navigate('/')
      }
    }
  }, [authenticationCompleted])

  return (
    <section className="grid h-screen items-center lg:grid-cols-2">
      <div className="my-auto p-8 text-center sm:p-10 md:p-20 xl:px-32 xl:py-24">
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>
        <Typography color="gray" className="mb-16">
          Enter your email and password to sign in
        </Typography>

        <form action="#" className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="email">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Your Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              onChange={handleUserName}
              placeholder="name@mail.com"
              className="focus:!border-t-gray-900"
              labelProps={{
                className: 'hidden'
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Password
              </Typography>
            </label>
            <Input
              id="password"
              color="gray"
              size="lg"
              type="password"
              name="password"
              onChange={handlePassword}
              placeholder="password"
              className="focus:!border-t-gray-900"
              labelProps={{
                className: 'hidden'
              }}
            />
            <Typography variant="small" className="mt-2 block font-medium text-gray-600">
              I agree to the{' '}
              <a href="#" className="underline transition-colors hover:text-gray-900">
                Terms and Conditions
              </a>
            </Typography>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="-ml-3">
              <Checkbox
                color="gray"
                label="Subscribe me to newsletter"
                labelProps={{
                  className: 'font-medium'
                }}
              />
            </div>
            <Typography as="a" href="#" color="gray" className="font-medium">
              Forgot password
            </Typography>
          </div>
          <Button color="gray" size="lg" className="mt-6" fullWidth onClick={handleSubmit}>
            sign in
          </Button>
          <Button
            color="white"
            size="lg"
            className="mt-4 flex h-12 items-center justify-center gap-2"
            fullWidth>
            <img src={`/logos/logo-google.png`} alt="google" className="h-6 w-6" /> sign in with
            google
          </Button>
          <Button
            color="white"
            size="lg"
            className="mt-4 flex h-12 items-center justify-center gap-2"
            fullWidth>
            <img src={`/logos/Twitter 2 - Official.png`} alt="google" className="h-6 w-6" /> sign in
            with x
          </Button>
          <Typography color="gray" className="mt-6 text-center font-normal">
            Not registered?{' '}
            <a href="/signup" className="font-medium text-gray-900">
              Create account
            </a>
          </Typography>
        </form>
      </div>
      {/* Image credit: Kourosh Qaffari/Unsplash */}
      <img
        src={`bg-sign-in.jpg`}
        alt="background image"
        className="hidden h-screen w-full object-cover lg:block"
      />
    </section>
  )
}

export default Login
/* 

<div className="flex justify-center items-center w-full mt-20">
<div className="w-[40%] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
  <UsernameField onChange={handleUserName} />
  <PasswordField onChange={handlePassword} labelText="Password" />
  <div className="flex items-center justify-between">
    <button
      className="bg-blue-500 hover:bg-blue-800 font-bold py-2 px-4 rounded"
      type="button"
      onClick={() => handleSubmit()}>
      Sign in
    </button>
  </div>
</div>
</div> */
