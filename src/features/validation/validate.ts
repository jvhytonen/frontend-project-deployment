import { AddAuthorType, ValidateBookType, Book } from '../types/types'

export const validateNewBookData = (formInputs: Book) => {
  if (
    formInputs.title.length > 1 &&
    formInputs.authorId &&
    formInputs.categoryId &&
    formInputs.isbn &&
    formInputs.yearPublished &&
    formInputs.description.length > 1 &&
    formInputs.publisher.length > 1
  ) {
    return true
  } else {
    return false
  }
}

export const validateUpdatedBookData = (formInputs: Book) => {
  if (
    formInputs.title.length > 1 &&
    formInputs.author &&
    formInputs.category &&
    formInputs.isbn &&
    formInputs.yearPublished &&
    formInputs.description.length > 1 &&
    formInputs.publisher.length > 1
  ) {
    return true
  } else {
    return false
  }
}

export const validateAuthorData = (formInputs: AddAuthorType) => {
  if (formInputs.name.length > 1 && formInputs.description.length > 1) {
    return true
  } else {
    return false
  }
}

export const validateSignUp = (username: string, password: string, confirmedPassword: string) => {
  let error = null
  if (!username) {
    error = 'Please fill in the username-field'
  } else if (password !== confirmedPassword) {
    error = 'Make sure your password confimation matches your password! '
  }
  return error
}
