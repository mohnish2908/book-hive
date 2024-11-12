import React, { useState } from "react";
import { CircleUserRound, UserPlus, BookOpen, UserCheck, Book, BookOpenCheck, Users, Edit, Menu, UserRoundPen, LogOut, UsersRound } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/Button";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminSidebar() {            
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleNavItemClick = (link) => {
        if (link === '/') {
            toast.success("Logged out");
            navigate(link, { replace: true });
        } else {
            navigate(link, { state: { data: data } });
        }
    };

    return (
        <div className={cn(
            "flex h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out",
            collapsed ? "w-16" : "w-64"
        )}>
            <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between h-16 px-4 bg-gray-800 border-b border-gray-700">
                    {!collapsed && <img src={logo} alt="logo" className="h-10" />}
                    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                        <Menu className="h-6 w-6 text-white" />
                    </Button>
                </div>
                <nav className="flex-1 overflow-y-auto bg-blue-900">
                    <ul className="p-2 space-y-2">
                        <NavItem icon={CircleUserRound} label="Admin Profile" collapsed={collapsed} link="/admin/adminprofile" onClick={handleNavItemClick} />
                        <NavItem icon={UserPlus} label="Add Member" collapsed={collapsed} link="/admin/addmember" onClick={handleNavItemClick} />
                        <NavItem icon={BookOpen} label="Add Book" collapsed={collapsed} link="/admin/addbook" onClick={handleNavItemClick} />
                        <NavItem icon={UserCheck} label="Add Admin" collapsed={collapsed} link="/admin/addadmin" onClick={handleNavItemClick} />
                        <NavItem icon={Book} label="Issue Book" collapsed={collapsed} link="/admin/issuebook" onClick={handleNavItemClick} />
                        <NavItem icon={BookOpenCheck} label="Return Book" collapsed={collapsed} link="/admin/returnbook" onClick={handleNavItemClick} />
                        <NavItem icon={Users} label="Get All Members" collapsed={collapsed} link="/admin/getallmembers" onClick={handleNavItemClick} />
                        <NavItem icon={BookOpenCheck} label="Get All Due Record" collapsed={collapsed} link="/admin/getduerecord" onClick={handleNavItemClick} />
                        <NavItem icon={Edit} label="Edit Member Details" collapsed={collapsed} link="/admin/editmemberdetails" onClick={handleNavItemClick} />
                        <NavItem icon={UserRoundPen} label="Add Publisher" collapsed={collapsed} link="/admin/addpublisher" onClick={handleNavItemClick} />
                        <NavItem icon={UsersRound} label="Show All Publishers" collapsed={collapsed} link="/admin/showallpublishers" onClick={handleNavItemClick} />
                        <NavItem icon={BookOpen} label="Request Issue" collapsed={collapsed} link="/admin/requestissue" onClick={handleNavItemClick} />
                        <NavItem icon={LogOut} label="Logout" collapsed={collapsed} link="/" onClick={handleNavItemClick} />
                        <NavItem icon={UsersRound} label="Show Record To Date" collapsed={collapsed} link="/admin/getrecordwithdate" onClick={handleNavItemClick} />
                    </ul>
                </nav>
            </div>
        </div>
    );
}

function NavItem({ icon: Icon, label, collapsed, link, onClick }) {
    return (
        <li className="hover:bg-gray-700 rounded-md">
            <button
                className={cn(
                    "flex items-center w-full text-white text-sm px-4 py-2 focus:outline-none",
                    collapsed ? "justify-center" : "justify-start"
                )}
                onClick={() => onClick(link)}
            >
                <Icon className="h-5 w-5" />
                {!collapsed && <span className="ml-3">{label}</span>}
            </button>
        </li>
    );
}
