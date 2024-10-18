import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import Button from '../components/core/HomePage/Button'
import Navbar from '../components/common/Navbar'
import home1 from '../assets/home1.jpg'
import home2 from '../assets/home2.jpg'


const Home = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex flex-col items-center justify-center h-screen'>
            
            <div className='flex flex-col items-center justify-center text-center'>
                <h1 className='text-4xl font-bold text-richblack-25'>Welcome to <HighlightText text='Book Hive'/></h1>
                <p className='text-lg text-richblack-25 text-center w-[75%] mt-5 mb-5'>Dive into a world of endless possibilities and enrich your mind with the vast knowledge housed within our library.Books are gateways to new ideas, experiences, and understanding.</p>
                <Button text='Get Started' Icon={FaArrowRight} to='/checkAvaibility'/>
            </div>
            
            <div className='flex gap-x-6 mt-10'>
                <img src={home1} alt='home1' width={400} height={300}/>
                <img src={home2} alt='home2' width={400} height={300}/>
            </div>
        
        </div>
    </div>
  )
}

export default Home
