import React from 'react';
import { useForm } from 'react-hook-form';
import "./CustomerNew.css"

function CustomerNew() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // handle form submission here
        console.log('Submitted:', data);
    };

    return (
        <div className="customer-new">
            <h1>Create New Customer</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: true })}
                    />
                    {errors.name && <span>Name is required</span>}
                </div>
                <div>
                    <label htmlFor="nationalId">National ID:</label>
                    <input
                        type="text"
                        id="nationalId"
                        {...register('nationalId', { required: true })}
                    />
                    {errors.nationalId && <span>National ID is required</span>}
                </div>
                <div>
                    <label htmlFor="economicCode">Economic Code:</label>
                    <input
                        type="text"
                        id="economicCode"
                        {...register('economicCode', { required: true })}
                    />
                    {errors.economicCode && <span>Economic Code is required</span>}
                </div>
                <div>
                    <label htmlFor="registerNumber">Register Number:</label>
                    <input
                        type="text"
                        id="registerNumber"
                        {...register('registerNumber', { required: true })}
                    />
                    {errors.registerNumber && <span>Register Number is required</span>}
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        {...register('phone', { required: true })}
                    />
                    {errors.phone && <span>Phone is required</span>}
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        {...register('address', { required: true })}
                    />
                    {errors.address && <span>Address is required</span>}
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

export default CustomerNew;
