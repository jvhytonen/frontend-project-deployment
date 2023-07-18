import React, { ChangeEvent, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../store'
import { LoginCredentialType, getUser, login } from '../../features/slices/userSlice'
import PasswordField from '../PasswordField/PasswordField'
import UsernameField from '../UsernameField/UsernameField'

function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const [userName, setUserName] = useState<string | null>(null)
  const [passWord, setPassWord] = useState<string | null>(null)

  const handlePassword = (pword: string) => {
    setPassWord(pword)
  }

  const handleUserName = (uname: string) => {
    setUserName(uname)
  }

  const handleSubmit = () => {
    if (userName && passWord) {
      console.log('HandleSubmit')
      const credentials = {
        username: userName,
        password: passWord
      }
      dispatch(login(credentials))
    }
  }
  return (
    <div className="flex justify-center items-center">
      <div className="w-[40%] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <UsernameField onChange={handleUserName} />
        <PasswordField onChange={handlePassword} labelText="Password" />
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
