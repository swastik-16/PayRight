import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Avatar({ n }) { 
    const router = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const spanRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router('/');
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !spanRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-flex items-center justify-center">
            <div
                className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center cursor-pointer"
                onClick={toggleDropdown}
            >
                <span ref={spanRef} className="font-medium text-green-700">{n}</span>
            </div>
            {dropdownOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                >
                    <div
                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </div>
                </div>
            )}
        </div>
    );
}
