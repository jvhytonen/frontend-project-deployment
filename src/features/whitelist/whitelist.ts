export type WhiteList = string[]

export const whitelist = ['jv.hytonen@gmail.com']

export const isOnTheWhitelist = (email: string) => {
  return whitelist.includes(email)
}
