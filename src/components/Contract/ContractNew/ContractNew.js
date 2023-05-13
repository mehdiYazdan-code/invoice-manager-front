import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "./ContractNew.css"

function ContractNew() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:8080/api/contracts', requestOptions);
        const responseData = await response.json();
        navigate(`/${responseData.id}`);
    };

    return (
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <label className="form-label">
                Contract Number:
                <input className="form-input" type="text" {...register("contractNumber", { required: true })} />
                {errors.contractNumber && <span>This field is required</span>}
            </label>
            <label className="form-label">
                Contract Description:
                <input className="form-input" type="text" {...register("contractDescription", { required: true })} />
                {errors.contractDescription && <span>This field is required</span>}
            </label>
            <label className="form-label">
                Customer ID:
                <input className="form-input" type="number" {...register("customerId", { required: true })} />
                {errors.customerId && <span>This field is required</span>}
            </label>
            <label className="form-label">
                Unit Price:
                <input className="form-input" type="number" {...register("unitPrice", { required: true })} />
                {errors.unitPrice && <span>This field is required</span>}
            </label>
            <label className="form-label">
                Quantity:
                <input className="form-input" type="number" {...register("quantity", { required: true })} />
                {errors.quantity && <span>This field is required</span>}
            </label>
            <label className="form-label">
                Type:
                <input className="form-input" type="text" {...register("type")} />
            </label>
            <label className="form-label">
                Start Date:
                <input className="form-input" type="date" {...register("startDate", { required: true })} />
                {errors.startDate && <span>This field is required</span>}
            </label>
            <label className="form-label">
                End Date:
                <input className="form-input" type="date" {...register("endDate", { required: true })} />
                {errors.endDate && <span>This field is required</span>}
            </label>
            <label className="form-label">
                Advance Payment:
                <input className="form-input" type="number" {...register("advancePayment", { required: true })} />
                {errors.advancePayment && <span>This field is required</span>}
            </label>
            <label className="form-label">
                Performance Bond:
                <input className="form-input" type="number" {...register("performanceBond", { required: true })} />
                {errors.performanceBond && <span>This field is required</span>}
            </label>
            <label className="form-label">
                Total Amount:
                <input className="form-input" type="number" {...register("totalAmount", { required: true })} />
                {errors.totalAmount && <span>This field is required</span>}
            </label>
            <label className="form-label">
                Total Barrels:
                <input className="form-input" type="number" {...register("totalBarrels", { required: true })} />
                {errors.totalBarrels && <span>This field is required</span>}
            </label>
            <label className="form-label">
                Barrel Type:
                <select className="form-select" {...register("barrelType")}>
                    <option value="OPEN_LID_220_LITER">Open Lid 220 Liter</option>
                    <option value="OPEN_LID_230_LITER">Open Lid 230 Liter</option>
                    <option value="CLOSED_LID_220_LITER">Closed Lid 220 Liter</option>
                    <option value="CLOSED_LID_230_LITER">Closed Lid 230 Liter</option>
                </select>
            </label>
            <button className="form-button" type="submit">Create Contract</button>
        </form>
    );
}

export default ContractNew;
