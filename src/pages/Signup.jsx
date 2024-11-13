import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        contactNo: '',
        gender: 'male',
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Reset message on submit

        if (!formData.name || !formData.email || !formData.address || !formData.contactNo) {
            setMessage('Please fill in all fields.');
            setIsError(true);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/newMember/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!data.data) {
                setMessage(data.error.message);
                setIsError(true);
            } else {
                setMessage(`User registered successfully: ${data.data.registrationId}`);
                setIsError(false);
                setFormData({ name: '', email: '', address: '', contactNo: '', gender: 'male' });
            }
        } catch (error) {
            console.error('Network error:', error);
            setMessage('An error occurred. Please try again later.');
            setIsError(true);
        }
    };

    const isFormValid = () => {
        return (
            formData.name &&
            formData.email &&
            formData.address &&
            /^\d{10}$/.test(formData.contactNo)
        );
    };

    return (
        <div className="text-white flex flex-col justify-center items-center h-screen">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Signup</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-semibold mb-1">Username:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="px-3 py-2 rounded-md text-black bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-semibold mb-1">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="px-3 py-2 rounded-md text-black bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="gender" className="text-sm font-semibold mb-1">Gender:</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="px-3 py-2 rounded-md text-black bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="address" className="text-sm font-semibold mb-1">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="px-3 py-2 rounded-md text-black bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="contactNo" className="text-sm font-semibold mb-1">Contact No:</label>
                        <input
                            type="text"
                            id="contactNo"
                            name="contactNo"
                            value={formData.contactNo}
                            onChange={handleChange}
                            maxLength={10}
                            className="px-3 py-2 rounded-md text-black bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formData.contactNo && !/^\d{10}$/.test(formData.contactNo) && (
                            <p className="text-red-500 text-xs mt-1">Please enter a valid 10-digit contact number.</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 mt-4 ${isFormValid() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 cursor-not-allowed'} text-white font-semibold rounded-md shadow-sm focus:outline-none`}
                        disabled={!isFormValid()}
                        style={{ backgroundColor: '#0A5A72' }}
                    >
                        Signup
                    </button>
                </form>
                {message && (
                    <div className={`mt-4 text-center text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </div>
                )}
                <div className="mt-6 text-center text-sm">
                    <p>
                        Already a member?{' '}
                        <a href="/login" className="text-blue-400 hover:underline">Login</a>
                    </p>
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
