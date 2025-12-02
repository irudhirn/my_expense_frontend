import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../Admin/Sidebar';

const AdminRoute = () => {
  return (
    <div className={`flex justify-start items-start min-h-screen`}>
      <AdminSidebar />
      <main className={`p-4`}>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminRoute