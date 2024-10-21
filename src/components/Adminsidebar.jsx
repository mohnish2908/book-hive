import React, { useState } from "react"
import { UserPlus, BookOpen, UserCheck, Book, BookOpenCheck, Users, Edit, Menu } from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./ui/Button"
import logo from "../assets/logo.jpg"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
export default function Adminsidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()
    const location = useLocation();
    const { data } = location.state || {};
    
    console.log(data);
    const toggleSidebar = () => {
        setCollapsed(!collapsed)
    }

    const handleNavItemClick = (link) => {
        navigate(link,{ state: { data: data } })
    }

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
                        <NavItem icon={UserPlus} label="Add Member" collapsed={collapsed} link="/admin/addmember" onClick={handleNavItemClick} />
                        <NavItem icon={BookOpen} label="Add Book" collapsed={collapsed} link="/admin/addbook" onClick={handleNavItemClick} />
                        <NavItem icon={UserCheck} label="Add Admin" collapsed={collapsed} link="/admin/addadmin" onClick={handleNavItemClick} />
                        <NavItem icon={Book} label="Issue Book" collapsed={collapsed} link="/admin/issuebook" onClick={handleNavItemClick} />
                        <NavItem icon={BookOpenCheck} label="Return Book" collapsed={collapsed} link="/admin/returnbook" onClick={handleNavItemClick} />
                        <NavItem icon={Users} label="Get All Members" collapsed={collapsed} link="/admin/getallmembers" onClick={handleNavItemClick} />
                        <NavItem icon={Edit} label="Edit Member Details" collapsed={collapsed} link="/admin/editmemberdetails" onClick={handleNavItemClick} />
                    </ul>
                </nav>
            </div>
        </div>
    )
}

function NavItem({ icon: Icon, label, collapsed, link, onClick }) {
    return (
        <li>
            <Button
                variant="ghost"
                className={cn(
                    "w-full text-white text-sm hover:bg-gray-700",
                    collapsed ? "px-4" : "px-5"
                )}
                onClick={() => onClick(link)}
            >
                <Icon className="h-4 w-4 text-white" />
                {!collapsed && <span className="ml-2">{label}</span>}
            </Button>
        </li>
    )
}
