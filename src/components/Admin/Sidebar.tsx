import React from 'react'
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

const AdminSidebar = () => {

  const logoutHandler = () => {
    
  }

  return (
    <aside className={`min-w-60 min-h-screen shadow p-4 flex flex-col justify-between items-stretch`}>
      <div>
        <div>
          <h1 className={`text-xl font-semibold`}>
            Track<span className={`text-primary`}>My</span>Money
          </h1>
        </div>
      </div>

      <div>
        <Button className={`bg-red-50 text-destructive w-full text-left justify-start hover:bg-red-100`} onClick={logoutHandler}><LogOut /> Logout</Button>
      </div>
    </aside>
  )
}

export default AdminSidebar;