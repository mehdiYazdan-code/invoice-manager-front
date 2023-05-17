import React from 'react';
import { useForm } from 'react-hook-form';

const AddendumDetails = ({ addendum }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data); // Handle form submission
    };

    return (
        <div>
            <h2>Addendum Details</h2>
            {addendum ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="id">ID:</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            defaultValue={addendum.id}
                            readOnly
                            ref={register}
                        />
                    </div>
                    <div>
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            type="text"
                            id="startDate"
                            name="startDate"
                            defaultValue={addendum.startDate}
                            readOnly
                            ref={register}
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date:</label>
                        <input
                            type="text"
                            id="endDate"
                            name="endDate"
                            defaultValue={addendum.endDate}
                            readOnly
                            ref={register}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <p>No addendum found.</p>
            )}
        </div>
    );
};

export default AddendumDetails;
