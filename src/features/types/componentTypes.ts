//Forms:

import { ChangeEvent, MouseEventHandler } from 'react'
import { Author, Book, Category, Copy, User, UserState } from './reduxTypes'
import { CheckoutActionType } from './actionTypes'

export type InputItemType = {
  fieldName: string
  name: string
  type: string
  placeholder: string
  labelText: string
  value?: string
  handleChange: (event: ChangeEvent<FormElement>) => void
}

export type OptionItemType = {
  fieldName: string
  placeholder: string
  name: string
  defaultValue?: string
  items: Author[] | Category[]
  onChange: (event: ChangeEvent<FormElement>) => void
}

export type TextAreaType = {
  fieldName: string
  labelText: string
  defaultValue?: string
  placeholder: string
  handleChange: (event: ChangeEvent<FormElement>) => void
}

export type UploadImageType = {
  onImageUpload: (file: File, fileName: string) => void
}

// All form elements needed to add or change data
export type FormElement = HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement

// Components:

export type ButtonType = {
  label: string
  type: 'neutral' | 'confirm' | 'cancel' | 'delete' | 'edit' | 'borrow' | 'return'
  handleClick: MouseEventHandler<HTMLButtonElement>
}

export interface DeleteAuthorType {
  authorId: string
  authorName: string
}

export type NavbarLinkProps = {
  link: string
  label: string
  closeMobileNav?: () => void
}

export interface TableProps {
  children: React.ReactNode
}

export type TableHeadingProps = {
  label: string
}

export interface AdminTableProps {
  headers: string[]
  rows: React.ReactNode[]
}

export type BookIntroProps = Partial<Book>

export type Modal = {
  type: string
  heading: string
  message: string
}

export type ModalProps = {
  heading: string
  text: string
  type: 'waitingConfirmation' | 'confirmed' | 'finished' | 'error' | 'confirm' | 'success'
  onConfirm: () => void
  onCancel?: () => void
}

export interface CopyProps {
  copyOrderNumber: number
  copy: Copy
  onCheckout: (checkoutObj: Copy, actionType: CheckoutActionType) => void
}

export type CopyPropsNoAuth = Omit<CopyProps, 'onCheckout'>

export interface CopiesProps {
  bookId: string
}

export interface BorrowProps {
  copyId: string
}

export interface ReturnProps {
  copyId: string
  checkoutId: string
}

export type FilterAuthors = {
  filterBooks: FilterType
}

export type FilterType = (e: string) => void

export type FilterAuthorsCheckbox = {
  author: string
  defaultChecked: boolean
  filterBooks: FilterType
}

export interface MenuProps {
  isAdmin: boolean
}

export interface HamburgerIconProps {
  isMobileNavOpen: boolean
  handleClick: () => void
}

export interface NavbarUserInfoProps {
  user: UserState
}

export interface AdminTabsProps {
  handleTabChange: (newTab: string) => void
}

export interface AdminTabProps {
  link: string
  onClick: () => void
}

export type AdminTabTypes = 'books' | 'categories' | 'authors'

export interface BookCardProps {
  imageUrl: string
  id: string
  category: string
  title: string
  description: string
  author: string
  yearPublished: string
}
