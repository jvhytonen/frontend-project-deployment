import React from 'react'

function Home() {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Library app - Juho-Veikko Hytönen
          </h5>
          <h6>Tech stack:</h6>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Front: React, TypeScript, Tailwind CSS and Redux-toolkit
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Back: Spring Boot and PostgreSQL
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
