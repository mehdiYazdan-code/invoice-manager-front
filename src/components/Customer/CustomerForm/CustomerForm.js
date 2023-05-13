import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./CustomerForm.css"

function CustomerForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const customerId = useParams()

    useEffect(() => {
        const getCustomer = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/customers/${customerId}`);
                reset(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        getCustomer();
    }, [customerId, reset]);

    const onSubmitHandler = async (data) => {
        try {
            await axios.put(`http://localhost:8080/api/customers/${customerId}`, data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="customer-form">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <label>
                    Name:
                    <input type="text" {...register('name', { required: true })} />
                    {errors.name && <span>This field is required</span>}
                </label>
                <label>
                    National ID:
                    <input type="text" {...register('nationalId', { required: true })} />
                    {errors.nationalId && <span>This field is required</span>}
                </label>
                <label>
                    Economic Code:
                    <input type="text" {...register('economicCode', { required: true })} />
                    {errors.economicCode && <span>This field is required</span>}
                </label>
                <label>
                    Register Number:
                    <input type="text" {...register('registerNumber', { required: true })} />
                    {errors.registerNumber && <span>This field is required</span>}
                </label>
                <label>
                    Phone:
                    <input type="text" {...register('phone', { required: true })} />
                    {errors.phone && <span>This field is required</span>}
                </label>
                <label>
                    Address:
                    <input type="text" {...register('address', { required: true })} />
                    {errors.address && <span>This field is required</span>}
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CustomerForm;
