import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiEndpoints from './api';

const ContractDetails = ({ contractId }) => {
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        // Fetch contract details from the API
        const fetchContractDetails = async () => {
            try {
                const response = await apiEndpoints.getContractById(contractId);
                const contract = response.data;

                // Set form field values using setValue
                setValue('contractNumber', contract.contractNumber);
                setValue('contractDescription', contract.contractDescription);
                setValue('unitPrice', contract.unitPrice);
                setValue('quantity', contract.quantity);
                setValue('startDate', contract.startDate);
                setValue('endDate', contract.endDate);
                setValue('advancePayment', contract.advancePayment);
                setValue('performanceBond', contract.performanceBond);
            } catch (error) {
                console.error('Error fetching contract details:', error);
            }
        };

        fetchContractDetails();
    }, [contractId, setValue]);

    const onSubmit = async (data) => {
        try {
            // Update contract details using the API endpoint
            await apiEndpoints.updateContract(contractId, data);
            console.log('Contract details updated successfully!');
        } catch (error) {
            console.error('Error updating contract details:', error);
        }
    };

    return (
        <div>
            <h2>Contract Details</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Contract Number</label>
                    <input type="text" {...register('contractNumber')} />
                </div>
                <div>
                    <label>Contract Description</label>
                    <input type="text" {...register('contractDescription')} />
                </div>
                <div>
                    <label>Unit Price</label>
                    <input type="number" {...register('unitPrice')} />
                </div>
                <div>
                    <label>Quantity</label>
                    <input type="number" {...register('quantity')} />
                </div>
                <div>
                    <label>Start Date</label>
                    <input type="date" {...register('startDate')} />
                </div>
                <div>
                    <label>End Date</label>
                    <input type="date" {...register('endDate')} />
                </div>
                <div>
                    <label>Advance Payment</label>
                    <input type="number" {...register('advancePayment')} />
                </div>
                <div>
                    <label>Performance Bond</label>
                    <input type="number" {...register('performanceBond')} />
                </div>
                <button type="submit">Update Contract</button>
            </form>
        </div>
    );
};

export default ContractDetails;
