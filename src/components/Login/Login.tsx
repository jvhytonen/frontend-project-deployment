import React, { ChangeEvent, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../store'
import { LoginCredentialType, getUser } from '../../features/user/userSlice'
import { isOnTheWhitelist } from '../../features/whitelist/whitelist'

function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)

  const handlePassword = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleUserName = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = () => {
    if (email && password) {
      const credentials = {
        id: 'ad3e0c62-ada2-41d6-8fe8-39bd8faec6dd'
      }
      dispatch(getUser(credentials.id))
    }
  }
  return (
    <div className="flex justify-center items-center">
      <div className="w-[40%] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => handleUserName(e)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => handlePassword(e)}
          />
          <p className="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-800 font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => handleSubmit()}>
            Sign In
          </button>
          {/*      <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                const decodedCredentials: LoginCredentialType = jwt_decode(
                  credentialResponse.credential
                )
                const credentials = {
                  name: decodedCredentials.name,
                  isAdmin: isOnTheWhitelist(decodedCredentials.email),
                  isLoggedIn: true,
                  email: decodedCredentials.email,
                  id: Number(decodedCredentials.sub)
                }
                dispatch(loginSuccess(credentials))
              }
            }}
            onError={() => {
              console.log('Login Failed')
            }}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default Login
