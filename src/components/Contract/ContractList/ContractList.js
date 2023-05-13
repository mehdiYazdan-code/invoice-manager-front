import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./ContractList.css"

function Contracts() {
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/contracts/')
            .then(res => {
                setContracts(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/contracts/${id}`)
            .then(res => {
                setContracts(contracts.filter(contract => contract.id !== id));
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="contract-list">
            <h2>Contracts</h2>
            <table>
                <thead>
                <tr>
                    <th>Contract Number</th>
                    <th>Description</th>
                    <th>Customer</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {contracts.map(contract => (
                    <tr key={contract.id}>
                        <td>{contract.contractNumber}</td>
                        <td>{contract.contractDescription}</td>
                        <td>{contract.customerId}</td>
                        <td>{contract.unitPrice}</td>
                        <td>{contract.quantity}</td>
                        <td>{contract.totalAmount}</td>
                        <td>
                            <Link to={`/${contract.id}`}>Edit</Link> |
                            <button onClick={() => handleDelete(contract.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <Link to="create">Create new contract</Link>
            </div>
        </div>
    );
}

export default Contracts;
