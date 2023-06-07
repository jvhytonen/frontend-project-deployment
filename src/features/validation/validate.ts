import { AddNewBookType, AddAuthorType } from '../types/types'

export const validateBookData = (formInputs: AddNewBookType) => {
  if (
    formInputs.title.length > 1 &&
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

export const validateAuthorData = (formInputs: AddAuthorType) => {
  if (formInputs.name.length > 1 && formInputs.description.length > 1) {
    return true
  } else {
    return false
  }
}
