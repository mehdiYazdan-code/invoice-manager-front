import React, { useEffect, useState } from 'react';
import apiEndpoints from './api';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch customers from the API
        const fetchCustomers = async () => {
            try {
                const response = await apiEndpoints.getCustomers();
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <div>
            <h2>Customer List</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>National ID</th>
                    <th>Economic Code</th>
                    <th>Register Number</th>
                    <th>Phone</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.nationalId}</td>
                        <td>{customer.economicCode}</td>
                        <td>{customer.registerNumber}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;
