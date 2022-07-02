import React from 'react'
import './Navbar.css'

export default function Navbar() {
    return (
        <div className='header'>
            <h1 className='title'>Daily Blogger</h1>
            <ul className='navList'>
                <li className='listButton'>Home</li>
                <li className='listButton'>New Post</li>
                <li className='listButton'>Profile</li>
            </ul>
        </div>
    )
}
