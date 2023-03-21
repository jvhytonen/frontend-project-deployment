export type Book = {
  ISBN: number
  title: string
  description: string
  publisher: string
  authors: string
  isBorrowed: boolean
  borrowerId: number | null
  published: number
  borrowDate: string | null
  returnDate: string | null
}

export const books: Book[] = [
  {
    ISBN: 9789517179720,
    title: 'Seven brothers',
    description: 'A story about seven brothers and their life',
    publisher: 'SKS',
    authors: 'Aleksis Kivi',
    isBorrowed: false,
    borrowerId: null,
    published: 1870,
    borrowDate: null,
    returnDate: null
  },
  {
    ISBN: 9789510430866,
    title: 'The Unknown Soldier',
    description: 'A legendary story from the WWII',
    publisher: 'WSOY',
    authors: 'Väinö Linna',
    isBorrowed: false,
    borrowerId: null,
    published: 1954,
    borrowDate: null,
    returnDate: null
  },
  {
    ISBN: 9789510430866,
    title: 'Under the North Star',
    description: 'Follow one family from the late 1800ies to the 1960ies',
    publisher: 'WSOY',
    authors: 'Väinö Linna',
    isBorrowed: true,
    borrowerId: 1,
    published: 1959,
    borrowDate: '21-03-2023',
    returnDate: '21-04-2023'
  }
]
