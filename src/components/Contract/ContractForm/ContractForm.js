import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker, {DateObject} from 'react-multi-date-picker';
import { getContractById, updateContract } from '../../../services/contractService';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import './ContractForm.css';
import moment from "jalali-moment";

function toShamsi(date) {
    return moment(date, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
}

const parseNumber = (number) => {
    return parseInt(number.replace(/^0+/, '').replace(/,/g, ''));
};


const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function ContractForm() {
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
    const { contractId } = useParams();
    console.log('use param: ', contractId);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // Convert formatted values back to numbers
        const convertedData = {
            ...data,
            unitPrice: parseFloat(data.unitPrice.replace(/,/g, '')),
            quantity: parseFloat(data.quantity.replace(/,/g, '')),
            advancePayment: parseFloat(data.advancePayment.replace(/,/g, '')),
            performanceBond: parseFloat(data.performanceBond.replace(/,/g, '')),
            insuranceDeposit: parseFloat(data.insuranceDeposit.replace(/,/g, '')),
            startDate: new DateObject(data.startDate).format("YYYY-MM-DD"),
            endDate: new DateObject(data.endDate).format("YYYY-MM-DD"),
        };

        const response = await updateContract(contractId, convertedData);
        if (response.status === 201) {
            navigate('/contracts');
        }
    };


    useEffect(() => {
        const loadContract = async () => {
          return  await getContractById(contractId)
        };

        loadContract().then(response => {
            // Set default values for the input fields
            const defaultValues = {
                contractNumber: response.data.contractNumber || '',
                contractDescription: response.data.contractDescription || '',
                customerId: response.data.customerId || '',
                unitPrice: (response.data.unitPrice) ? formatNumber(response.data.unitPrice.toString()) : '',
                quantity: (response.data.quantity) ? formatNumber(response.data.quantity.toString()) : '',
                startDate: new DateObject(response.data.startDate).toDate() || new Date(),
                endDate: new DateObject(response.data.endDate).toDate()|| new Date(),
                advancePayment: (response.data.advancePayment) ? formatNumber(response.data.advancePayment.toString()) : '',
                performanceBond: (response.data.performanceBond) ? formatNumber(response.data.performanceBond.toString()) : '',
                insuranceDeposit: (response.data.insuranceDeposit) ? formatNumber(response.data.insuranceDeposit) : '',
                barrelType: response.data.barrelType || 'OPEN_LID_220_LITER',
            };

            for (const key in defaultValues) {
                setValue(key, defaultValues[key]);
            }
        });
    }, [contractId, setValue]);

    // Format value with 3-digit grouping
    function formatValue(value) {
        if (!value) return '';

        // Remove all non-digit characters from the value
        const numericValue = value.replace(/\D/g, '');

        // Convert the numeric value to a number and apply the 3-digit grouping format
        return Number(numericValue).toLocaleString('en-US');
    }

    // Handle formatted input change event
    const handleFormattedInputChange = (e) => {
        const { name, value } = e.target;

        // Remove non-digit characters from the value
        const numericValue = value.replace(/\D/g, '');

        // Format the numeric value
        const formattedValue = formatValue(numericValue);

        // Update the input field value
        e.target.value = formattedValue;

        // Set the value in the form state
        setValue(name, formattedValue);
    };

    return (
        <div className="contract-form">
            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="form-field">
                                <label className="form-label">شماره قرارداد:</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    {...register('contractNumber', { required: true })}
                                />
                                {errors.contractNumber && <span>This field is required</span>}
                            </div>
                            <div className="form-field">
                                <label className="form-label">شرح قرارداد:</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    {...register('contractDescription', { required: true })}
                                />
                                {errors.contractDescription && <span>This field is required</span>}
                            </div>
                            <div className="form-field">
                                <label className="form-label">کارفرما:</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    {...register('customerId', { required: true })}
                                />
                                {errors.customerId && <span>This field is required</span>}
                            </div>
                            <div className="form-field">
                                <label className="form-label">قیمت واحد (ریال):</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    {...register('unitPrice', { required: true })}
                                    onChange={handleFormattedInputChange}
                                />
                                {errors.unitPrice && <span>This field is required</span>}
                            </div>
                            <div className="form-field">
                                <label className="form-label">تعداد:</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    {...register('quantity', { required: true })}
                                    onChange={handleFormattedInputChange}
                                />
                                {errors.quantity && <span>This field is required</span>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-field">
                                <label className="form-label">تاریخ شروع:</label>
                                <Controller
                                    control={control}
                                    name="startDate"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <DatePicker
                                            value={field.value}
                                            calendar={persian}
                                            locale={persian_fa}
                                            onChange={(date) => field.onChange(date?.isValid ? date.toDate() : null)}
                                            format="YYYY/MM/DD"
                                            inputClass="form-input"
                                        />
                                    )}
                                />
                                {errors.startDate && <span>This field is required</span>}
                            </div>
                            <div className="form-field">
                                <label className="form-label">تاریخ پایان:</label>
                                <Controller
                                    control={control}
                                    name="endDate"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <DatePicker
                                            value={field.value}
                                            calendar={persian}
                                            locale={persian_fa}
                                            onChange={(date) => field.onChange(date?.isValid ? date.toDate() : null)}
                                            format="YYYY/MM/DD"
                                            inputClass="form-input"
                                        />
                                    )}
                                />
                                {errors.endDate && <span>This field is required</span>}
                            </div>
                            <div className="form-field">
                                <label className="form-label">پیش پرداخت:</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    {...register('advancePayment', { required: false })}
                                    onChange={handleFormattedInputChange}
                                />
                                {errors.advancePayment && <span>This field is required</span>}
                            </div>
                            <div className="form-field">
                                <label className="form-label">تضمین اجرا:</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    {...register('performanceBond', { required: false })}
                                    onChange={handleFormattedInputChange}
                                />
                                {errors.performanceBond && <span>This field is required</span>}
                            </div>
                            <div className="form-field">
                                <label className="form-label">ودیعه بیمه:</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    {...register('insuranceDeposit', { required: false })}
                                    onChange={handleFormattedInputChange}
                                />
                                {errors.insuranceDeposit && <span>This field is required</span>}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-field">
                                <label className="form-label">نوع بشکه:</label>
                                <select className="form-input" {...register('barrelType')}>
                                    <option value="OPEN_LID_220_LITER">با درب باز ۲۲۰ لیتری</option>
                                    <option value="CLOSED_LID_220_LITER">با درب بسته ۲۲۰ لیتری</option>
                                    <option value="CLOSED_LID_150_LITER">با درب بسته ۱۵۰ لیتری</option>
                                    <option value="OPEN_LID_150_LITER">با درب باز ۱۵۰ لیتری</option>
                                    <option value="OPEN_LID_110_LITER">با درب باز ۱۱۰ لیتری</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button type="submit" className="btn btn-primary">
                                ذخیره
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ContractForm;
