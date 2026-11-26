import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router'
import { Toaster } from 'sonner';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="mb-4">
        <NavBar />
      </header>
      <main className="container flex-grow-1">
        <Outlet />
      </main>
      <Toaster richColors />      
      <Footer />
    </div>
  )
}
