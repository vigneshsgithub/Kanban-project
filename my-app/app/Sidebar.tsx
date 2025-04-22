'use client';
import Link from 'next/link'
import React from 'react';
import ToggleBtn from './ToggleBtn/page';
import {useState} from 'react';


const Sidebar = () => {
  const [user, setUser] = useState("");
  const handleLogOut = async () => {
    
    const res = await fetch(`http://localhost:8000/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user}`,
      },
    });
    if (res.status == 200) {
      setUser("");
      localStorage.clear();
    }
  }
  return (
    <div className='sidebar-container'>
      <h1 className='sidebar-text'>ALL BOARDS</h1>
      <Link href='/dashboard' className='link-length'>
        <div className='platform-launch'>
          <button className='platform-text'>Platform Launch</button>
        </div>
      </Link>
      <Link href="/dashboard/PricingFolder" className='link-length'>
        <div className='pricing'>
          <button className='pricing-text'> Pricing</button>
        </div>
      </Link>
      <div className='toggleTheme-container'>
       <ToggleBtn/>
      </div>
      <Link href="/login" className='link-length'>
      <div className='logout-container'>
        <button className='logout-btn'onClick={handleLogOut}>Logout</button>
      </div>
     </Link>
    </div>
  )
}

export default Sidebar