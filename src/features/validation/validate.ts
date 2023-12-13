import { Author, Book } from '../types/reduxTypes'

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

export const validateAuthorData = (formInputs: Author) => {
  // We make sure both fields contain at least something.
  if (formInputs.name.length > 1 && formInputs.description.length > 1) {
    return true
  } else {
    return false
  }
}

export const validateSignUp = (password: string, confirmedPassword: string) => {
  if (
    password === confirmedPassword &&
    password.length > 7 &&
    hasLowerCase(password) &&
    hasUpperCase(password) &&
    containsNumbers(password)
  ) {
    return false
  } else {
    return true
  }
}

function hasLowerCase(str: string) {
  return str.toUpperCase() !== str
}
function hasUpperCase(str: string) {
  return str.toLowerCase() !== str
}
const containsNumbers = (string: string): boolean => {
  const regex = /\d/
  return regex.test(string)
}
