// Requests to the server:

import { CheckoutBorrow, CheckoutReturn } from './actionTypes'
import { Author, Book, Category, NewCopy, User } from './reduxTypes'

export type Token = string

export interface CategoryPostRequest {
  token: Token
  data: Category
}
export interface CategoryDeleteRequest {
  id: string
  token: Token
}
export interface AuthorPostRequest {
  token: Token
  data: Author
}
export interface AuthorDeleteRequest {
  id: string
  token: Token
}
export interface BookPostRequest {
  token: Token
  data: Book
}
export interface CheckoutRequest {
  token: Token
  data: CheckoutBorrow | CheckoutReturn
}
export interface DeleteRequest {
  url: string
  token: Token
}
export interface PostRequest {
  url: string
  token: Token
  body: Category | Author | Book | User | NewCopy | CheckoutBorrow | CheckoutReturn
}
export interface BookDeleteRequest {
  id: string
  token: Token
}

export interface CopyPostRequest {
  token: Token
  bookId: string
}

export interface CopyDeleteRequest {
  token: Token
  id: string
}

export interface GetRequestWithAuth {
  url: string
  token: Token
}

export type GetRequestWithoutAuth = Omit<GetRequestWithAuth, 'token'>

export interface SearchRequest {
  page: number
  query: string
}

export interface GetUsersRequest {
  token: string
}
