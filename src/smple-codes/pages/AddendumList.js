import React, { useEffect, useState } from 'react';
import apiEndpoints from './api';

const AddendumList = ({ contractId }) => {
    const [addendums, setAddendums] = useState([]);

    useEffect(() => {
        // Fetch addendums for the contract from the API
        const fetchAddendums = async () => {
            try {
                const response = await apiEndpoints.getAddendums(contractId);
                const fetchedAddendums = response.data;
                setAddendums(fetchedAddendums);
            } catch (error) {
                console.error('Error fetching addendums:', error);
            }
        };

        fetchAddendums();
    }, [contractId]);

    return (
        <div>
            <h2>Addendums</h2>
            {addendums.length === 0 ? (
                <p>No addendums found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {addendums.map((addendum) => (
                        <tr key={addendum.id}>
                            <td>{addendum.id}</td>
                            <td>{addendum.startDate}</td>
                            <td>{addendum.endDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AddendumList;
