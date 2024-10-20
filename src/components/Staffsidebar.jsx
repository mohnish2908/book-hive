import React, { useState } from "react"
import { UserPlus, BookOpen, UserCheck, Book, BookOpenCheck, Users, Edit, Menu } from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./ui/Button"
import logo from "../assets/logo.jpg"

export default function Staffsidebar() {
    const [collapsed, setCollapsed] = useState(false)

    const toggleSidebar = () => {
        setCollapsed(!collapsed)
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
                <nav className="flex-1 overflow-y-auto bg-gray-800">
                    <ul className="p-2 space-y-2">
                        <NavItem icon={UserPlus} label="Add Member" collapsed={collapsed} link="/add-member" />
                        <NavItem icon={BookOpen} label="Add Book" collapsed={collapsed} link="/add-book" />
                        <NavItem icon={UserCheck} label="Add Admin" collapsed={collapsed} link="/add-admin" />
                        <NavItem icon={Book} label="Issue Book" collapsed={collapsed} link="/issue-book" />
                        <NavItem icon={BookOpenCheck} label="Return Book" collapsed={collapsed} link="/return-book" />
                        <NavItem icon={Users} label="Get All Members" collapsed={collapsed} link="/get-all-members" />
                        <NavItem icon={Edit} label="Edit Member Details" collapsed={collapsed} link="/edit-member-details" />
                    </ul>
                </nav>
            </div>
        </div>
    )
}

function NavItem({ icon: Icon, label, collapsed }) {
    return (
        <li>
            <Button
                variant="ghost"
                className={cn(
                    "w-full text-white text-sm hover:bg-gray-700",
                    collapsed ? "px-4" : "px-5"
                )}
            >
                <Icon className="h-4 w-4 text-white" />
                {!collapsed && <span className="ml-2">{label}</span>}
            </Button>
        </li>
    )
}
