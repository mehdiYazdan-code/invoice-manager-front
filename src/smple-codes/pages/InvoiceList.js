import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiEndpoints from "./api";


const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        // Fetch the invoices from the API
        apiEndpoints.getInvoices()
            .then(response => {
                setInvoices(response.data);
            })
            .catch(error => {
                console.error('Error fetching invoices:', error);
            });
    }, []);

    return (
        <div>
            <h2>Invoices</h2>
            <table>
                <thead>
                <tr>
                    <th>Invoice Number</th>
                    <th>Invoice Date</th>
                    <th>Customer</th>
                    <th>Contract</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {invoices.map(invoice => (
                    <tr key={invoice.id}>
                        <td>{invoice.invoiceNumber}</td>
                        <td>{invoice.invoiceDate}</td>
                        <td>{invoice.customer.name}</td>
                        <td>{invoice.contract.contractNumber}</td>
                        <td>{invoice.amount}</td>
                        <td>{invoice.status}</td>
                        <td>
                            <Link to={`/invoices/${invoice.id}`}>
                                Details
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceList;
