import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'

import Layout from './Layout/Layout'
import AdminLayout from "./Layout/AdminLayout"

import Home from './Pages/Home'
import ReachOutForm from './Pages/ReachOutForm'
import AdminLogin from './Pages/AdminLogin'
import AdminDashBaord from './Pages/AdminDashboard'
import Message from './Components/Message'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="form" element={<ReachOutForm />} />
          <Route path="admin" element={<AdminLogin />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AdminLayout />}>
            <Route index path="dashboard" element={<AdminDashBaord />} />
            <Route path="message/:id" element={<Message />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
