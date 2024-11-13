import React, { useState } from 'react';
import Adminsidebar from '../../components/Adminsidebar';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Editmemberdetails = () => {
    const location = useLocation();
    const { data } = location.state || {};
    const [memberId, setMemberId] = useState('');
    const [response, setResponse] = useState(null);
    const [bookRecord, setBookRecord] = useState([]);

    // Fetch member details and book records
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!memberId) {
            toast.error('Please enter a valid member ID');
            return;
        }
        try {
            const res = await fetch(`http://localhost:8080/admin/getMemberRecord/${memberId}`);
            const result = await res.json();
            console.log("response1:", result);
            if (!result.data) {
                toast.error('No member records found');
            } else {
                toast.success('Member record found');
                setResponse(result.data);
                getBookRecords(result.data.memberId);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error editing member details');
        }
    };

    // Fetch member's book records
    const getBookRecords = async (memberId) => {
        try {
            const res = await fetch(`http://localhost:8080/admin/getMemberBookRecord/${memberId}`);
            const result = await res.json();
            console.log("response2:", result);
            if (!result.data.length) {
                toast.error('No book records found');
            } else {
                setBookRecord(result.data);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error fetching book details');
        }
    };

    // Toggle member status (active/inactive)
    const changeStatus = async () => {
        if (!response) {
            toast.error('No member record found to update status');
            return;
        }
        try {
            const res = await fetch(`http://localhost:8080/admin/deActivateMember/${response.memberId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await res.json();
            console.log("change:", result);
            toast.success(response.isActive ? 'Member deactivated' : 'Member activated');
            setResponse({ ...response, isActive: !response.isActive });
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error updating member status');
        }
    };

    return (
        <div className='flex flex-row min-h-screen bg-gray-900 p-4 text-white'>
            <Adminsidebar data={data} />
            <div className='flex-1 mx-4 p-6 rounded-lg shadow-md bg-gray-800'>
                <h2 className='text-xl font-bold text-white mb-4'>Get Member Details:</h2>
                <form onSubmit={handleSubmit}>
                    <label className='block text-gray-300 mb-2'>Member ID:</label>
                    <input
                        type='text'
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        className='mt-1 p-3 w-full border border-gray-600 rounded-md text-black focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Enter Member ID'
                    />
                    <button
                        type='submit'
                        className='mt-4 w-full p-3 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-semibold rounded'
                    >
                        Submit
                    </button>
                </form>

                {response && (
                    <div className='mt-6'>
                        <h3 className='text-lg font-bold text-white'>Member Details</h3>
                        <table className='w-full text-gray-300 mt-2'>
                            <tbody>
                                <tr><td className='p-2 border'>Member ID</td><td className='p-2 border'>{response.memberId}</td></tr>
                                <tr><td className='p-2 border'>Name</td><td className='p-2 border'>{response.name}</td></tr>
                                <tr><td className='p-2 border'>Gender</td><td className='p-2 border'>{response.gender}</td></tr>
                                <tr><td className='p-2 border'>Email</td><td className='p-2 border'>{response.email}</td></tr>
                                <tr><td className='p-2 border'>Address</td><td className='p-2 border'>{response.address}</td></tr>
                                <tr><td className='p-2 border'>Contact No</td><td className='p-2 border'>{response.contactNo}</td></tr>
                                <tr><td className='p-2 border'>Added By Admin</td><td className='p-2 border'>{response.adminId}</td></tr>
                                <tr><td className='p-2 border'>Status</td><td className='p-2 border'>{response.isActive ? 'Active' : 'Inactive'}</td></tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {bookRecord.length > 0 && (
                    <div className='mt-6'>
                        <h3 className='text-lg font-bold text-white'>Book Records</h3>
                        <table className='w-full text-gray-300 mt-2'>
                            <thead>
                                <tr>
                                    <th className='p-2 border'>Book ID</th>
                                    <th className='p-2 border'>Issue Date</th>
                                    <th className='p-2 border'>Return Date</th>
                                    <th className='p-2 border'>Issued By</th>
                                    <th className='p-2 border'>Returned By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookRecord.map((record, index) => (
                                    <tr key={index}>
                                        <td className='p-2 border'>{record.bookId}</td>
                                        <td className='p-2 border'>{new Date(record.issueDate).toLocaleDateString()}</td>
                                        <td className='p-2 border'>
                                            {record.returnDate ? new Date(record.returnDate).toLocaleDateString() : 'Not Returned'}
                                        </td>
                                        <td className='p-2 border'>{record.adminId || 'N/A'}</td>
                                        <td className='p-2 border'>{record.returnedBy || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {response && (
                    <button
                        onClick={changeStatus}
                        className={`translate-x-[100%] mt-4 w-[30%] p-3 text-white font-semibold rounded duration-2000 ${
                            response.isActive ? 'hover:bg-red-200 bg-yellow-500' : 'hover:bg-green-200 bg-yellow-500'
                        }`}
                    >
                        {response.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Editmemberdetails;
