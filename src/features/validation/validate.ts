import { AddNewBookType, AddAuthorType } from '../types/types'

export const validateBookData = (formInputs: AddNewBookType) => {
  // Validation still in progress with number values (ISBN && published)
  if (
    formInputs.title.length > 1 &&
    formInputs.authors.length > 1 &&
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
