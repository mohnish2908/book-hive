import React from 'react'
import Navbar from '../components/common/Navbar'

const About = () => {
    return (
        <div>
            <Navbar/>
            <div className="flex flex-col items-center">
                <div className='aboutbookhive p-5 text-white max-w-4xl'>
                    <h1 className='text-center font-bold text-3xl'>About Our Library Management Project (Book-Hive)</h1>
                    <br/>
                    <section>
                        <h2 className='text-center font-bold text-2xl'>Scope for Members</h2>
                        <ul className='list-disc list-inside'>
                            <li>Browse and search for books</li>
                            <li>Reserve books online</li>
                            <li>View borrowing history</li>
                            <li>Receive notifications for due dates</li>
                        </ul>
                    </section>
                    <br/>
                    <br/>
                    <section>
                        <h2 className='text-center font-bold text-2xl'>Scope for Admins</h2>
                        <ul className='list-disc list-inside'>
                            <li>Manage book inventory</li>
                            <li>Approve or reject book reservations</li>
                            <li>Track borrowing and returns</li>
                            <li>Generate reports and analytics</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default About
