import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import apiEndpoints from "./api";


const InvoiceDetails = () => {
    const { id } = useParams();
    const { register, handleSubmit, reset, setValue } = useForm();
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await apiEndpoints.getInvoiceById(id);
                setInvoice(response.data);
                reset(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInvoice();
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            await apiEndpoints.updateInvoice(id, data);
            alert('Invoice updated successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    if (!invoice) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="invoiceNumber">Invoice Number:</label>
                <input
                    type="text"
                    id="invoiceNumber"
                    name="invoiceNumber"
                    ref={register}
                />
            </div>
            <div>
                <label htmlFor="customer">Customer:</label>
                <input type="text" id="customer" name="customer" ref={register} />
            </div>
            <div>
                <label htmlFor="contract">Contract:</label>
                <input type="text" id="contract" name="contract" ref={register} />
            </div>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input type="text" id="amount" name="amount" ref={register} />
            </div>
            <div>
                <label htmlFor="issueDate">Issue Date:</label>
                <input type="text" id="issueDate" name="issueDate" ref={register} />
            </div>
            <div>
                <label htmlFor="dueDate">Due Date:</label>
                <input type="text" id="dueDate" name="dueDate" ref={register} />
            </div>
            <div>
                <label htmlFor="status">Status:</label>
                <input type="text" id="status" name="status" ref={register} />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default InvoiceDetails;
