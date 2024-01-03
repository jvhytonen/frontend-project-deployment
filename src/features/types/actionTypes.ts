export type Borrow = {
  userId: string
  copyId: string
}

export type HandleClick = () => void
export type HandleAuthorClick = (id: number) => void

export type Credentials = {
  username: string
  password: string
}

export type SignUpData = {
  name: string
  username: string
  password: string
}

export type CheckoutBorrow = {
  copyId: string
  userId: string
}

export type CheckoutReturn = {
  checkoutId: string
  copyId: string
  userId: string
}
