import React from 'react';
import {Link} from "react-router-dom";
import "./sidebar.css"

const Sidebar = () => {
    return (
        <div className="container-fluid min-vh-100 m-0" style={{backgroundColor : "#151B54"}}>
            <div className="row sidebar-item">
                <Link className="link" to="/users">کاربران</Link>
            </div>
            <div className="row sidebar-item">
                <Link className="link" to="/customers">مشتریان</Link>
            </div>
            <div className="row sidebar-item">
                <Link className="link" to="/reports">گزارشات روزانه</Link>
            </div>
            <div className="row sidebar-item">
                <Link className="link" to="/dashboard">داشبورد</Link>
            </div>
            <div className="row sidebar-item">
                <Link className="link" to="/playground">test</Link>
            </div>
        </div>
    );
};

export default Sidebar;