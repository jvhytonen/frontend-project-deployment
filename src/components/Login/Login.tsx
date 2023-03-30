import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../store'
import { LoginCredentialType, loginSuccess } from '../../features/user/userSlice'
import { isOnTheWhitelist } from '../../features/whitelist/whitelist'

function Login() {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div>
      <GoogleLogin
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
      />
    </div>
  )
}

export default Login
