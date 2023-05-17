import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import apiEndpoints from "./api";


const CustomerDetails = () => {
    const { id } = useParams();
    const { register, handleSubmit, reset, setValue } = useForm();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await apiEndpoints.getCustomerById(id);
                setCustomer(response.data);
                reset(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCustomer();
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            await apiEndpoints.updateCustomer(id, data);
            alert('Customer updated successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" ref={register} />
            </div>
            <div>
                <label htmlFor="nationalId">National ID:</label>
                <input type="text" id="nationalId" name="nationalId" ref={register} />
            </div>
            <div>
                <label htmlFor="economicCode">Economic Code:</label>
                <input type="text" id="economicCode" name="economicCode" ref={register} />
            </div>
            <div>
                <label htmlFor="registerNumber">Register Number:</label>
                <input type="text" id="registerNumber" name="registerNumber" ref={register} />
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" name="phone" ref={register} />
            </div>
            <div>
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" ref={register} />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default CustomerDetails;
