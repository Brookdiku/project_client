"use client"
import React from 'react'
import AdminLayout from './AdminLayout'

const page = () => {
  return (
    <AdminLayout>
      <div className='flex flex-col gap-4 '>
        <div className='flex flex-row gap-3 h-52 p-4'>
          <div className='h-full w-1/4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500  '>

          </div>
          <div className='h-full w-1/4 rounded-lg bg-gradient-to-r from-pink-300 to-pink-600  '>

          </div>
          <div className='h-full w-1/4 rounded-lg bg-gradient-to-r from-green-300 to-green-500  '>

          </div>
          <div className='h-full w-1/4 rounded-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>

          </div>
        </div>
        <div className='flex h-80 p-4 flex-row gap-3'>
          <div className='h-full w-1/2 rounded-lg bg-red-100 '>

          </div>
          <div className='h-full w-1/2 rounded-lg bg-yellow-100 '>

          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default page