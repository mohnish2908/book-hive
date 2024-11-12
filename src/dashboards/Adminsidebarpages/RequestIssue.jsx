import React, { useState } from 'react';  
import Adminsidebar from '../../components/Adminsidebar';  
import { useLocation } from 'react-router-dom';  
import { toast } from 'react-toastify';  
import Loader from '../../components/Loader';  

const RequestIssue = () => {  
    const location = useLocation();  
    const { data } = location.state || {};  
    const adminId = data.adminId;  
    const [loading, setLoading] = useState(false);  
    const [requestIssue, setRequestIssue] = useState([]);  

    const getAllRequest = async () => {  
        try {  
            const response = await fetch("http://localhost:8080/admin/getAllBookRequest");  
            const res = await response.json();  
            // Assuming res.data is the correct structure  
            console.log(res);
            setRequestIssue(res.data || []);  
        } catch (error) {  
            console.log(error);  
        }  
    };  

    const handleApprove = async (memberId, bookId) => {  
        try {  
            setLoading(true);  
            const response = await fetch(`http://localhost:8080/admin/issueBook/${memberId}/${adminId}/${bookId}`, {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify({ memberId, bookId, adminId }),  
            });  
            const res = await response.json();  
            toast.success('Book Issued successfully');  
            console.log(res);  
            // Refresh the requests after approving  
            getAllRequest();  
        } catch (error) {  
            console.log("err", error);  
            toast.error('Error issuing book');  
        } finally {  
            setLoading(false);  
        }  
    };  

    const handleReject = async (memberId, bookId) => {
        try {  
            setLoading(true); 
            console.log("memberId:", memberId);
            console.log("bookId:", bookId); 
            // const bookid=bookId[0];
            const response = await fetch(`http://localhost:8080/admin/rejectBookRequest`, {  
                method: 'DELETE',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify({ memberId, bookId }),  
            });  
            const res = await response.json();  
            toast.success('Request Rejected successfully');  
            console.log(res);  
            // Refresh the requests after approving  
            getAllRequest();  
        } catch (error) {  
            console.log("err", error);  
            toast.error('Error issuing book');  
        } finally {  
            setLoading(false);  
        } 
    }

    return (  
        <div className="flex text-white">  
            <Adminsidebar data={data} />  
            <div className="flex-1 p-6">  
                <button  
                    onClick={getAllRequest}  
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"  
                >  
                    Get All Requests  
                </button>  
                {loading ? (  
                    <Loader />  
                ) : (   
                    requestIssue.length > 0 ? (  
                        <table className="min-w-full bg-gray-800">  
                            <thead>  
                                <tr>  
                                    <th className="py-2 px-4 border-b border-gray-700">Member ID</th>  
                                    <th className="py-2 px-4 border-b border-gray-700">Book ID</th>  
                                    <th className="py-2 px-4 border-b border-gray-700">Action</th>  
                                </tr>  
                            </thead>  
                            <tbody>  
                                {requestIssue.map((request, index) => (  
                                    <tr key={index} className="hover:bg-gray-700">  
                                        <td className="py-2 px-4 border-b border-gray-700 translate-x-[25%]">{request.memberId}</td>  
                                        <td className="py-2 px-4 border-b border-gray-700 translate-x-[25%]">{request.bookId.join(', ')}</td>  
                                        <td className="py-2 px-4 border-b border-gray-700 translate-x-[25%]">  
                                            <button  
                                                type="button"  
                                                onClick={() => handleApprove(request.memberId, request.bookId[0])}  
                                                className="bg-blue-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"  
                                            >  
                                                Approve  
                                            </button> 
                                            <button type='button' onClick={()=>handleReject(request.memberId,request.bookId)}
                                            className="translate-x-[10%] bg-blue-600 hover:bg-green-700 text-white font-bold mx-2 py-1 px-3 rounded">
                                                Reject
                                            </button> 
                                        </td>  
                                    </tr>  
                                ))}  
                            </tbody>  
                        </table>  
                    ) : (  
                        <p className="text-red-500">No requests found.</p>  
                    )  
                )}  
            </div>  
        </div>  
    );  
};  

export default RequestIssue;