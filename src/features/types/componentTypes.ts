import { ChangeEvent, MouseEventHandler } from 'react'

import { Author, Book, Category, Copy, UserState } from './reduxTypes'

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

export type TableHeadingProps = {
  label: string
}

export interface AdminTableProps {
  headers: string[]
  rows: React.ReactNode[]
}

export type BookIntroProps = Partial<Book>
export type ModalMessageType = 'info' | 'confirm' | 'confirmed' | 'finished' | 'error'

export type ModalContent = {
  heading: string
  content: string
  type: ModalMessageType
}

export type ModalProps = {
  head: string
  content: string
  type?: 'confirm' | 'confirmed' | 'info' | 'error'
  // onConfirm: () => void
  // onCancel?: () => void
}

export interface CopyProps {
  copyOrderNumber: number
  copy: Copy
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

export interface BookCardProps {
  imageUrl: string
  id: string
  category: string
  title: string
  description: string
  author: string
  yearPublished: string
}

export interface AdminSearchAndAddProps {
  section: string
  navigation: string
  label: string
  filter: (word: string) => void
}

type TableFeature = 'categories' | 'authors' | 'books'

export interface DeleteItemProps {
  feature: 'categories' | 'authors' | 'books' | 'copies'
  item: Author | Category | Book | Copy
}

export interface TableBodyProps {
  items: Author[] | Category[] | null
  feature: TableFeature
}

export interface CopyStatusProps {
  copyItem: Copy
}

export interface CopyActionsProps {
  copyItem: Copy
  classes: string
}
