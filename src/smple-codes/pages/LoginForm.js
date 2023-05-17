import React from 'react';
import { useForm } from 'react-hook-form';
import apiEndpoints from "./api";


const LoginForm = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await apiEndpoints.login(data);
            const token = response.data.token;
            // Save the token to local storage or state
            // Redirect to the desired page
            console.log('Login successful!');
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
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" ref={register} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
