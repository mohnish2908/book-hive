import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import Issuedbooks from './dashboards/Membersidebarpages/Issuedbooks';
import Myprofile from './dashboards/Membersidebarpages/Myprofile';
import Searchbooks from './dashboards/Membersidebarpages/Searchbooks';
import Requestedbooks from './dashboards/Membersidebarpages/Requestedbooks';
import Returnedbooks from './dashboards/Membersidebarpages/Returnedbooks';
import Addpublisher from './dashboards/Adminsidebarpages/Addpublisher';
import RequestIssue from './dashboards/Adminsidebarpages/RequestIssue';

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
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
        <Route path='/member/myprofile' element={<Myprofile/>}/>
        <Route path='/member/searchbooks' element={<Searchbooks/>}/>
        <Route path='/member/requestedbooks' element={<Requestedbooks/>}/>
        <Route path='/member/returnedbooks' element={<Returnedbooks/>}/>
        <Route path='/admin/addpublisher' element={<Addpublisher/>}/>
        <Route path='/admin/requestissue' element={<RequestIssue/>}/>
      </Routes>
    </div>
  );
}

export default App;