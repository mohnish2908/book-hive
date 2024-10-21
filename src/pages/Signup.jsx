import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        contactNo: '',
        gender: 'male'
    });
    const [con,setcon]=useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     const response = await axios.post('/newMember/create', formData);
        //     console.log(response.data);
        // } catch (error) {
        //     console.error('There was an error!', error);

        // }
        let response;
      try {
        console.log(formData);
        
        response = await fetch(`http://localhost:8080/newMember/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        
          body: JSON.stringify(formData),
        });
        const d=await response.json();
        console.log(d);
        if(d.data===null){
          setcon(d.error.message);
        }
        else{
            setcon('User registered successfully'+d.data.registrationId);
        }
        // const data = await response.json();

      } catch (networkError) {
        console.error('Network error:', networkError);
        return;
      }
    };

    return (
        <div className='text-white flex flex-col justify-center items-center h-screen '>
            <div className="h-1/2 w-1/3 border flex flex-col justify-center items-center ">
                <h1 className='text-3xl font-bold'>Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mt-7'>
                        <label htmlFor="name">Username:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{ color: 'black', marginLeft: '15px' }}
                        />
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ color: 'black', marginLeft: '50px' }}
                        />
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="gender">Gender:</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            style={{ color: 'black', marginLeft: '50px' }}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            style={{ color: 'black', marginLeft: '30px' }}
                        />
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="contactNo">Contact No:</label>
                        <input
                            type="text"
                            id="contactNo"
                            name="contactNo"
                            value={formData.contactNo}
                            onChange={handleChange}
                            style={{ color: 'black', marginLeft: '10px' }}
                        />
                    </div>
                    <div className='mt-4 mx-5 text-center'>
                        <p>{con}</p>
                    </div>
                    <button type="submit" className='mt-3 translate-x-[140%] bg-richblack-500 text-black px-4 py-1'>Signup</button>
                </form>
                <div className="mt-4 text-center">
                    <p>Already a member? <a href="/login" className="text-blue-500">Login</a></p>
                </div>
            </div>
        </div>
    );
};

export const Signup = () => {
    return (
        <div>
            <Navbar />
            <SignupForm />
        </div>
    );
};

export default Signup;
