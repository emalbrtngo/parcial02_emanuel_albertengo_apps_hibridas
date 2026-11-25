import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router'
import { Toaster } from 'sonner';

export default function Layout() {
  return (
    <div className="container">
        <header className="mb-4">
            <NavBar />
            <Outlet />
            <Toaster richColors/>
        </header>
    </div>
  )
}