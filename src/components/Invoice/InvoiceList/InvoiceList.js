import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./InvoiceList.css"

function InvoiceList() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/invoices')
            .then(response => response.json())
            .then(data => setInvoices(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="invoice-list">
            <h1>Invoices</h1>
            <Link to="create">Create New</Link>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Contract ID</th>
                    <th>Issued Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {invoices.map(invoice => (
                    <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>{invoice.contractId}</td>
                        <td>{invoice.issuedDate}</td>
                        <td>{invoice.dueDate}</td>
                        <td>{invoice.status}</td>
                        <td>
                            <Link to={`${invoice.id}`}>Edit</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default InvoiceList;
