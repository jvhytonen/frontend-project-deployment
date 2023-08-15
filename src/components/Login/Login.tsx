import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../store'
import { login, nullifyAuthError } from '../../features/slices/authSlice'
import PasswordField from '../FormControls/PasswordField/PasswordField'
import UsernameField from '../FormControls/UsernameField/UsernameField'
import { useNavigate } from 'react-router-dom'

function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const [userName, setUserName] = useState<string | null>(null)
  const [passWord, setPassWord] = useState<string | null>(null)
  const [authenticationCompleted, setAuthenticationCompleted] = useState<boolean>(false)
  const navigate = useNavigate()
  const role = useSelector((state: RootState) => state.auth.items.role)
  const error = useSelector((state: RootState) => state.auth.error)

  const handlePassword = (pword: string) => {
    setPassWord(pword)
  }

  const handleUserName = (uname: string) => {
    setUserName(uname)
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
    <div className="flex justify-center items-center">
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
    </div>
  )
}

export default Login
