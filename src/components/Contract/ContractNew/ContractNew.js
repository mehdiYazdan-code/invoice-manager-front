import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "./ContractNew.css"
import {createContract} from "../../../services/contractService";


function ContractNew() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const response = await createContract(data)
        if (response.status === 201)
            navigate("/api/contracts");
    };

    return (
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="form-label">
                            شماره قرارداد:
                            <input className="form-input" type="text" {...register("contractNumber", { required: true })} />
                            {errors.contractNumber && <span>This field is required</span>}
                        </label>
                        <label className="form-label">
                            شرح قرارداد:
                            <input className="form-input" type="text" {...register("contractDescription", { required: true })} />
                            {errors.contractDescription && <span>This field is required</span>}
                        </label>
                        <label className="form-label">
                            کارفرما:
                            <input className="form-input" type="number" {...register("customerId", { required: true })} />
                            {errors.customerId && <span>This field is required</span>}
                        </label>
                        <label className="form-label">
                            قیمت واحد (ریال):
                            <input className="form-input" type="number" {...register("unitPrice", { required: true })} />
                            {errors.unitPrice && <span>This field is required</span>}
                        </label>
                        <label className="form-label">
                            تعداد:
                            <input className="form-input" type="number" {...register("quantity", { required: true })} />
                            {errors.quantity && <span>This field is required</span>}
                        </label>
                    </div>
                    <div className="col">
                        <label className="form-label">
                            تاریخ شروع:
                            <input className="form-input" type="date" {...register("startDate", { required: true })} />
                            {errors.startDate && <span>This field is required</span>}
                        </label>
                        <label className="form-label">
                            تاریخ پایان:
                            <input className="form-input" type="date" {...register("endDate", { required: true })} />
                            {errors.endDate && <span>This field is required</span>}
                        </label>
                        <label className="form-label">
                            پیش پرداخت:
                            <input className="form-input" type="number" {...register("advancePayment", { required: true })} />
                            {errors.advancePayment && <span>This field is required</span>}
                        </label>
                        <label className="form-label">
                            ضمانتنامه:
                            <input className="form-input" type="number" {...register("performanceBond", { required: true })} />
                            {errors.performanceBond && <span>This field is required</span>}
                        </label>
                        <label className="form-label">
                            نوع بشکه:
                            <select className="form-select" {...register("barrelType")}>
                                <option value="OPEN_LID_220_LITER">Open Lid 220 Liter</option>
                                <option value="OPEN_LID_230_LITER">Open Lid 230 Liter</option>
                                <option value="CLOSED_LID_220_LITER">Closed Lid 220 Liter</option>
                                <option value="CLOSED_LID_230_LITER">Closed Lid 230 Liter</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="row">
                    <button className="form-button" type="submit">ایجاد</button>
                </div>
            </div>
        </form>
    );
}

export default ContractNew;
