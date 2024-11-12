import React, { useState } from "react";
import { CircleUserRound, Search, Book, BookOpen, BookOpenCheck, Menu, LogOut } from "lucide-react";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.jpg";

export default function MemberSidebar() {
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
                    <button onClick={toggleSidebar} className="p-2 focus:outline-none">
                        <Menu className="h-6 w-6 text-white" />
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto bg-blue-900">
                    <ul className="p-2 space-y-2">
                        <NavItem icon={CircleUserRound} label="Member Profile" collapsed={collapsed} link="/member/memberprofile" onClick={handleNavItemClick} />
                        <NavItem icon={Search} label="Search Book" collapsed={collapsed} link="/member/searchbook" onClick={handleNavItemClick} />
                        <NavItem icon={Book} label="Requested Book" collapsed={collapsed} link="/member/requestedbooks" onClick={handleNavItemClick} />
                        <NavItem icon={BookOpen} label="Issued Books" collapsed={collapsed} link="/member/issuedbooks" onClick={handleNavItemClick} />
                        <NavItem icon={BookOpenCheck} label="Get All Books" collapsed={collapsed} link="/member/returnedbooks" onClick={handleNavItemClick} />
                        <NavItem icon={LogOut} label="Logout" collapsed={collapsed} link="/" onClick={handleNavItemClick} />
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
