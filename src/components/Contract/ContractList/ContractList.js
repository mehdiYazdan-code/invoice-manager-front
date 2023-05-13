import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./ContractList.css"
import {deleteContract, getAllContracts} from "../../../services/contractService";





function Contracts() {
    const [contracts, setContracts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadContracts(){
             return  getAllContracts()
        }
        loadContracts().then(response => setContracts(response.data))
    }, []);

    const handleDelete = async (id) => {
        const response = await deleteContract(id);
        if (response.status === 204)
            navigate("/api/contracts")
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
