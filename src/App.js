import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import About from './pages/About';
import SearchBook from './pages/Searchbook';
import Members from './dashboards/Members';
import Admin from './dashboards/Admin';
import Addadmin from './dashboards/Adminsidebarpages/Addadmin';
import Addbook from './dashboards/Adminsidebarpages/Addbook';
import Addmember from './dashboards/Adminsidebarpages/Addmember';
import Editmemberdetails from './dashboards/Adminsidebarpages/Editmemberdetails';
import Getallmembers from './dashboards/Adminsidebarpages/Getallmembers';
import Issuebook from './dashboards/Adminsidebarpages/Issuebook';
import Returnbook from './dashboards/Adminsidebarpages/Returnbook';
import Showallbooks from './dashboards/Adminsidebarpages/Showallbooks';
import Issuedbooks from './dashboards/Membersidebarpages/Issuedbooks';
import Memberprofile from './dashboards/Membersidebarpages/Memberprofile';
import Adminprofile from './dashboards/Adminsidebarpages/Adminprofile';
import Searchbooks from './dashboards/Membersidebarpages/Searchbooks';
import Showallpublishers from './dashboards/Adminsidebarpages/Showallpublishers';
import Requestedbooks from './dashboards/Membersidebarpages/Requestedbooks';
import Returnedbooks from './dashboards/Membersidebarpages/Returnedbooks';
import Addpublisher from './dashboards/Adminsidebarpages/Addpublisher';
import RequestIssue from './dashboards/Adminsidebarpages/RequestIssue';
import GetDueRecord from './dashboards/Adminsidebarpages/GetDueRecord';
import GetRecordWithDate from './dashboards/Adminsidebarpages/GetRecordWithDate';

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path='/searchbook' element={<SearchBook/>}/>
        <Route path='/member' element={<Members/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin/addadmin' element={<Addadmin/>}/>
        <Route path='/admin/addbook' element={<Addbook/>}/>
        <Route path='/admin/addmember' element={<Addmember/>}/>
        <Route path='/admin/editmemberdetails' element={<Editmemberdetails/>}/>
        <Route path='/admin/getallmembers' element={<Getallmembers/>}/>
        <Route path='/admin/issuebook' element={<Issuebook/>}/>
        <Route path='/admin/returnbook' element={<Returnbook/>}/>
        <Route path='/member/issuedbooks' element={<Issuedbooks/>}/>
        <Route path='/member/memberprofile' element={<Memberprofile/>}/>
        <Route path='/admin/adminprofile' element={<Adminprofile/>}/>
        <Route path='/member/searchbook' element={<Searchbooks/>}/>
        <Route path='/member/requestedbooks' element={<Requestedbooks/>}/>
        <Route path='/member/returnedbooks' element={<Returnedbooks/>}/>
        <Route path='/admin/addpublisher' element={<Addpublisher/>}/>
        <Route path='/admin/requestissue' element={<RequestIssue/>}/>
        <Route path='/admin/showallpublishers' element={<Showallpublishers/>}/>
        <Route path='/admin/getduerecord' element={<GetDueRecord/>}/>
        <Route path='/admin/getrecordwithdate' element={<GetRecordWithDate/>}/>
        <Route path='/admin/showallbooks' element={<Showallbooks/>}/>
      </Routes>
    </div>
  );
}

export default App;
