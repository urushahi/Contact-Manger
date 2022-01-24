import React from 'react';
import { MdLogout } from "react-icons/md"
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    }
    return (
        <nav className='navbar'>
            <h4>Contact Manager</h4>
            <div className='d-flex align-items-center link-header'>
                <MdLogout className='mr-2' />
                <div className='link-white' onClick={logout}>Logout</div>
            </div>
        </nav>
    )
}

export default Header
