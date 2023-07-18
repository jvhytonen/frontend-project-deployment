import React, { useState } from 'react'
import UsernameField from '../UsernameField/UsernameField'
import PasswordField from '../PasswordField/PasswordField'
import { validateSignUp } from '../../features/validation/validate'

function Signup() {
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [confirmedPassword, setConfirmedPassword] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const handleUserName = (uname: string) => {
    setEmail(uname)
  }
  const handlePassword = (pword: string) => {
    setPassword(pword)
  }
  const handleConfirmPassword = (pword: string) => {
    setConfirmedPassword(pword)
  }
  const handleSubmit = () => {
    const validationError = validateSignUp(
      email as string,
      password as string,
      confirmedPassword as string
    )
    if (validationError === null) {
      console.log('sending to server')
    }
    setValidationError(validationError)
  }
  return (
    <div className="flex justify-center items-center">
      <div className="w-[40%] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h2 className="text-2xl">Create an account</h2>
        {validationError !== null ? <p className="text-red-800">{validationError}</p> : null}
        <UsernameField onChange={handleUserName} />
        <PasswordField onChange={handlePassword} labelText="Password" />
        <PasswordField onChange={handleConfirmPassword} labelText="Confirm password " />

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-800 font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleSubmit}>
            Create an account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup
