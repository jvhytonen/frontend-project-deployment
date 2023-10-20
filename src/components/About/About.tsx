import React, { ReactNode } from 'react'
import { Card, CardBody, Typography } from '@material-tailwind/react'
import {
  ComputerDesktopIcon,
  ServerStackIcon,
  CloudIcon,
  TableCellsIcon,
  LockClosedIcon,
  FolderIcon
} from '@heroicons/react/24/solid'

interface FeatureCard {
  // Heroicons lack TypeScript-support.
  icon: ReactNode
  title: string
  children: string
}

function FeatureCard({ icon, title, children }: FeatureCard) {
  return (
    <Card color="transparent" shadow={false}>
      <CardBody className="grid justify-center text-center">
        <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full bg-gray-900 p-2.5 text-white shadow">
          {icon}
        </div>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography className="font-normal !text-gray-500">{children}</Typography>
      </CardBody>
    </Card>
  )
}

const features = [
  {
    icon: <ComputerDesktopIcon className="h-6 w-6" />,
    title: 'React, TypeScript & Material-Tailwind',
    description:
      'Frontend is build with React by using TypeScript. Styling is done with Tailwind and most of the components are from Material-Tailwind-library.'
  },
  {
    icon: <TableCellsIcon className="h-6 w-6" />,
    title: 'Redux Toolkit',
    description:
      'Browser-side data handling is implemented with Redux-Toolkit. This application contains nine stores and slices.'
  },
  {
    icon: <ServerStackIcon className="h-6 w-6" />,
    title: 'Spring Boot',
    description:
      'The server is running with Spring Boot and all the backend logic is written with Java. It resides in Render.com and the database is using Postgres.'
  },
  {
    icon: <LockClosedIcon className="h-6 w-6" />,
    title: 'Spring Security and Spring Data',
    description:
      'This application contains authentication. Only logged in users can borrow and return books. Only admins can add new books into the library.'
  },
  {
    icon: <CloudIcon className="h-6 w-6" />,
    title: 'Amazon Web Services',
    description:
      'Bookcover images are resided in AWS S3-bucket. The admin user can upload the files into the S3 by using Java AWS SDK.'
  },
  {
    icon: <FolderIcon className="h-6 w-6" />,
    title: 'Docker',
    description:
      'The backend is running in Docker-container. Both front- and backend are automatically deployded after new commit to GitHub.'
  }
]

export function FeatureSection1() {
  return (
    <section className="py-28 px-4">
      <div className="container mx-auto mb-10 text-center lg:mb-20">
        <Typography color="blue-gray" className="mb-2 font-bold uppercase">
          About the library
        </Typography>
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 text-3xl !leading-tight lg:text-5xl">
          Fullstack E-book -library -application
        </Typography>
        <Typography variant="lead" className="mx-auto w-full px-4 !text-gray-500 lg:w-9/12 lg:px-8">
          This is a library application where you can (imaginary) borrow and return books.
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
        {features.map(({ icon, title, description }) => (
          <FeatureCard key={title} icon={icon} title={title}>
            {description}
          </FeatureCard>
        ))}
      </div>
    </section>
  )
}

export default FeatureSection1
