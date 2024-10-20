import React, { useState } from "react";
import { User, Search, Book, BookOpen, BookOpenCheck, Menu } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Membersidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
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
                        <NavItem icon={User} label="My Profile" collapsed={collapsed} path="/member/myprofile" />
                        <NavItem icon={Search} label="Search Book" collapsed={collapsed} path="/member/searchbook" />
                        <NavItem icon={Book} label="Requested Book" collapsed={collapsed} path="/member/requestedbooks" />
                        <NavItem icon={BookOpen} label="Issued Books" collapsed={collapsed} path="/member/issuedbooks" />
                        <NavItem icon={BookOpenCheck} label="Returned Books" collapsed={collapsed} path="/member/returnedbooks" />
                    </ul>
                </nav>
            </div>
        </div>
    );
}

function NavItem({ icon: Icon, label, collapsed, path }) {
    const navigate = useNavigate();

    return (
        <li>
            <Button
                variant="ghost"
                className={cn(
                    "w-full text-white text-sm hover:bg-gray-700",
                    collapsed ? "px-4" : "px-5"
                )}
                onClick={() => navigate(path)}
            >
                <Icon className="h-4 w-4 text-white" />
                {!collapsed && <span className="ml-2">{label}</span>}
            </Button>
        </li>
    );
}
