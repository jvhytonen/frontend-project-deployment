// Custom hook for showing modals for confirmation of action and completion of the API-call.
import { useState } from 'react'

export const useModal = () => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)
  const [confirmationText, setConfirmationText] = useState('')
  const [completionText, setCompletionText] = useState('')

  const showConfirmModal = (text: string) => {
    //This is for the user to confirm the operation.
    setConfirmationText(text)
    setShowConfirmation(true)
  }

  const showCompletionModal = (text: string) => {
    //This is to show that the operation was succesful.
    setCompletionText(text)
    setShowCompletion(true)
  }
  const handleConfirm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => {
    //Preventing the form to make default submit.
    event.preventDefault()
    showConfirmModal(text)
  }

  return {
    showConfirmation,
    showCompletion,
    confirmationText,
    completionText,
    handleConfirm,
    showConfirmModal,
    showCompletionModal,
    setShowConfirmation,
    setShowCompletion
  }
}
