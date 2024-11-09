import React, { useState } from 'react';  
import Adminsidebar from '../../components/Adminsidebar';  
import { useLocation } from 'react-router-dom';  

const RequestIssue = () => {  
    const location = useLocation();  
    const { data } = location.state || {};  
    console.log(data);  
    const adminId = data.adminId;

    const [requestIssue, setRequestIssue] = useState([]);  

    const getAllRequest = async () => {  
        try {  
            const response = await fetch("http://localhost:8080/admin/getAllBookRequest");  
            const res = await response.json();  
            // Assuming res.data is the correct structure  
            setRequestIssue(res.data || []);  
            console.log(res);  
        } catch (error) {  
            console.log(error);  
        }  
    };  

    const handleApprove =async (memberId, bookId) => {  
        try{
          console.log(memberId, bookId,adminId);
          const response = await fetch(`http://localhost:8080/admin/requestBookIssue`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:{memberId, bookId,adminId},
          }); 
          const res = await response.json();
          console.log(res)
        }
        catch(error){
            console.log("err",error);
        }
    };  

    return (  
        <div className="flex text-white">  
            <Adminsidebar data={data} />  
            <div className="content">  
                <button onClick={getAllRequest}>Get All Requests</button>  
                {requestIssue.length > 0 ? (  
                    <table>  
                        <thead>  
                            <tr>  
                                <th>Member ID</th>  
                                <th>Book ID</th>  
                                <th>Action</th>  
                            </tr>  
                        </thead>  
                        <tbody>  
                            {requestIssue.map((request, index) => (  
                                <tr key={index}>  
                                    <td>{request.memberId}</td>  
                                    <td>{request.bookId.join(', ')}</td>  
                                    <td>  
                                        <button   
                                            onClick={() => handleApprove(request.memberId, request.bookId[0])}  
                                            className="approve-button"  
                                        >  
                                            Approve  
                                        </button>  
                                    </td>  
                                </tr>  
                            ))}  
                        </tbody>  
                    </table>  
                ) : (  
                    <p>No requests found.</p>  
                )}  
            </div>  
        </div>  
    );  
};  

export default RequestIssue;