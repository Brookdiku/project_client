"use client"
import React from 'react'
import SideBar from '../components/SideBar'
import Landing from '../components/Landing'
import AdminLayout from './AdminLayout'

const page = () => {
  return (
    <AdminLayout>
      <Landing />
    </AdminLayout>
  )
}

export default page