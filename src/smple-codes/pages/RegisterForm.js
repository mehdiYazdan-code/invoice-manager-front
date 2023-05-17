import React from 'react';
import { useForm } from 'react-hook-form';
import apiEndpoints from "./api";


const RegisterForm = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            await apiEndpoints.register(data);
            // Registration successful, redirect to login page or show a success message
            console.log('Registration successful!');
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" ref={register} />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" ref={register} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" ref={register} />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
