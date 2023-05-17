import React, { useEffect, useState } from 'react';
import apiEndpoints from './api';

const ContractList = () => {
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        // Fetch contracts from the API
        const fetchContracts = async () => {
            try {
                const response = await apiEndpoints.getContracts();
                setContracts(response.data);
            } catch (error) {
                console.error('Error fetching contracts:', error);
            }
        };

        fetchContracts();
    }, []);

    return (
        <div>
            <h2>Contract List</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Contract Number</th>
                    <th>Contract Description</th>
                    <th>Customer</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Barrel Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Advance Payment</th>
                    <th>Performance Bond</th>
                </tr>
                </thead>
                <tbody>
                {contracts.map((contract) => (
                    <tr key={contract.id}>
                        <td>{contract.id}</td>
                        <td>{contract.contractNumber}</td>
                        <td>{contract.contractDescription}</td>
                        <td>{contract.customer.name}</td>
                        <td>{contract.unitPrice}</td>
                        <td>{contract.quantity}</td>
                        <td>{contract.barrelType.name}</td>
                        <td>{contract.startDate}</td>
                        <td>{contract.endDate}</td>
                        <td>{contract.advancePayment}</td>
                        <td>{contract.performanceBond}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContractList;
