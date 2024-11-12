import React, { useState, useEffect } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Addbook = () => {
    const initialFormData = {
        title: '',
        authorName: '',
        edition: '',
        language: '',
        isbn: '',
        totalPages: '',
        publicationYear: '',
        category: '',
        available: true,
        count: 1,
        // publisherId: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const location = useLocation();
    const { data } = location.state || {};
    const [id, setId] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);

            const response = await fetch(`http://localhost:8080/admin/addBook/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log(result);
            toast.success('Book added successfully');
            setFormData(initialFormData); // Reset form data
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error adding book');
        }
    };

    const [publishers, setPublishers] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState('');

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const response = await fetch(`http://localhost:8080/admin/getAllPublisher`);
                const data = await response.json();
                setPublishers(Array.isArray(data.data) ? data.data : []);
                console.log(data.data);
            } catch (error) {
                console.error('Error fetching publishers:', error);
            }
        };

        fetchPublishers();
    }, []);

    const handlePublisherChange = (e) => {
        const publisherId = e.target.value;
        setSelectedPublisher(publisherId);
        setFormData({
            ...formData,
            publisherId: publisherId,
        });
        setId(publisherId);
    };

    return (
        <div className='text-white flex'>
            <div>
                <Adminsidebar data={data} />
            </div>

            <div className='w-full max-w-md mx-auto mt-8'>
                <form onSubmit={handleSubmit} className='bg-gray-800 p-8 rounded-lg shadow-md'>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded-md'
                            style={{ color: 'black' }}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>Author Name:</label>
                        <input
                            type="text"
                            name="authorName"
                            value={formData.authorName}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded-md'
                            style={{ color: 'black' }}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>Edition:</label>
                        <input
                            type="text"
                            name="edition"
                            value={formData.edition}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded-md'
                            style={{ color: 'black' }}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>Language:</label>
                        <input
                            type="text"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded-md'
                            style={{ color: 'black' }}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>ISBN:</label>
                        <input
                            type="text"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded-md'
                            style={{ color: 'black' }}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>Total Pages:</label>
                        <input
                            type="number"
                            name="totalPages"
                            value={formData.totalPages}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded-md'
                            style={{ color: 'black' }}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>Publication Year:</label>
                        <input
                            type="date"
                            name="publicationYear"
                            value={formData.publicationYear}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded-md'
                            style={{ color: 'black' }}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded-md'
                            style={{ color: 'black' }}
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>Count:</label>
                        <select
                            name="count"
                            value={formData.count}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded-md'
                            style={{ color: 'black' }}
                        >
                            {[...Array(10).keys()].map(i => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-2'>Publisher:</label>
                        <select
                            name="publisher"
                            value={selectedPublisher}
                            onChange={handlePublisherChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded-md'
                            style={{ color: 'black' }}
                        >
                            <option value="">Select a publisher</option>
                            {publishers.length > 0 && publishers.map((publisher) => (
                                <option key={publisher.publisherId} value={publisher.publisherId}>
                                    {publisher.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>
                        Add Book
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Addbook;
