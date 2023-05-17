import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div style={{ width: '200px', background: '#f0f0f0' }}>
            <ul>
                <li>
                    <Link to="/customers">Customers</Link>
                </li>
                <li>
                    <Link to="/contracts">Contracts</Link>
                </li>
                <li>
                    <Link to="/addendums">Addendums</Link>
                </li>
                <li>
                    <Link to="/invoices">Invoices</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
