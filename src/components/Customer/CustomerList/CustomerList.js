import React, { useState, useEffect } from 'react';
import "./CustomerList.css"
import {Link} from "react-router-dom";
import IconAddCircleLine from "../../assets/icons/IconAddCircleLine";

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        async function fetchCustomers() {
            const response = await fetch('http://localhost:8080/api/customers');
            const data = await response.json();
            setCustomers(data);
        }

        fetchCustomers();
    }, []);

    const handleEdit = (id) => {
        // handle edit logic
        console.log(`Edit customer ${id}`);
    };

    const handleDelete = (id) => {
        // handle delete logic
        console.log(`Delete customer ${id}`);
    };

    const handleCreate = () => {
        // handle create new logic
        console.log('Create new customer');
    };

    return (
        <div className="customer-list">
            <h1>Customer List</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>National ID</th>
                    <th>Economic Code</th>
                    <th>Register Number</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.name}</td>
                        <td>{customer.nationalId}</td>
                        <td>{customer.economicCode}</td>
                        <td>{customer.registerNumber}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                        <td>
                            <Link to={`${customer.id}`}>Edit</Link>
                            <button onClick={() => handleDelete(customer.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
                <Link to="create" style={{color:"white",textDecoration:"none"}}>
                    <IconAddCircleLine fontSize={30}/>
                </Link>
        </div>
    );
}

export default CustomerList;
