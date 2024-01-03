import React, { useState } from 'react'
import { Accordion, AccordionHeader, AccordionBody, Typography } from '@material-tailwind/react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

const faqs = [
  {
    title: 'How do I add an item?',
    desc: "You choose the item (book, author, category, user) from the navigation you want to add. Then in the upper corner, click 'Add author' or 'Add book' to do it."
  },
  {
    title: 'How can i delete items?',
    desc: 'By clicking the trach can icon in the row you want to delete. However you cannot delete something that is still needed. If you want to delete an author, you have to delete all the books and copies that are written by that particular author.'
  },
  {
    title: 'How can I search books or authors?',
    desc: 'Every subpage includes searchfield where you can write your search query. Items matching the query will be shown on the table below.'
  },
  {
    title: 'Can I break something?',
    desc: "No you can't. However everything you remove will be permanently removed. If you delete a book, you have to add it again."
  },
  {
    title: 'When do the changes occur?',
    desc: 'Immediately when the data has been updated to the server. If you cannot see any changes, refresh the browser and you should see them'
  }
]

export const AdminHome = () => {
  const adminName = useSelector((state: RootState) => state.auth.items.role)
  const [open, setOpen] = useState(0)
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value)

  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container mx-auto">
        <div className="mb-24 text-center">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 text-4xl !leading-snug lg:text-5xl">
            Welcome {adminName}
          </Typography>
          <Typography variant="lead" className="mx-auto !text-gray-500 lg:w-3/5">
            Here you can edit, add and delete books, authors, categories and users. Instructions
            below
          </Typography>
        </div>

        <div className="mx-auto lg:max-w-screen-lg lg:px-20">
          {faqs.map(({ title, desc }, key) => (
            <Accordion key={key} open={open === key + 1} onClick={() => handleOpen(key + 1)}>
              <AccordionHeader className="text-left text-gray-900">{title}</AccordionHeader>
              <AccordionBody>
                <Typography color="blue-gray" className="font-normal text-gray-500">
                  {desc}
                </Typography>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdminHome
