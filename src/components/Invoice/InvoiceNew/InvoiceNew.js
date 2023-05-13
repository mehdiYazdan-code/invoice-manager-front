import { useForm, useFieldArray } from "react-hook-form";
import "./InvoiceNew.css"
import {NumericFormat} from "react-number-format";
import {useCallback} from "react";

function InvoiceNew() {
    const { register, control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            items: [{ unitPrice: '', quantity: '' }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items'
    });

    const unitPrices = watch(fields.map((item) => `items.${item.id}.unitPrice`), []);
    const quantities = watch(fields.map((item) => `items.${item.id}.quantity`), []);

    const calculateAmount = useCallback((index) => {
        return unitPrices[index] * quantities[index];
    }, [unitPrices, quantities]);

    const calculateTotalAmount = useCallback(() => {
        return fields.reduce((total, item, index) => total + calculateAmount(index), 0);
    }, [fields, calculateAmount]);

    const onSubmit = (data) => {
        // Convert the formatted numbers to integers
        const items = data.items.map((item) => ({
            unitPrice: parseInt(item.unitPrice.replace(/\D/g, '')),
            quantity: parseInt(item.quantity.replace(/\D/g, ''))
        }));

        console.log({
            ...data,
            items
        });

        // You can add additional logic here to process the form data
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="invoice-new">
                <label>
                    Contract ID:
                    <input type="number" {...register("contractId", { required: true })} />
                    {errors.contractId && <span>This field is required</span>}
                </label>
                <label>
                    Issued Date:
                    <input type="date" {...register("issuedDate", { required: true })} />
                    {errors.issuedDate && <span>This field is required</span>}
                </label>
                <label>
                    Due Date:
                    <input type="date" {...register("dueDate", { required: true })} />
                    {errors.dueDate && <span>This field is required</span>}
                </label>
                <label>
                    Status:
                    <select {...register("status", { required: true })}>
                        <option value="PENDING">Pending</option>
                        <option value="PAID">Paid</option>
                    </select>
                    {errors.status && <span>This field is required</span>}
                </label>
                <table>
                    <thead>
                    <tr>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {fields.map((item, index) => (
                        <tr key={item.id}>
                            <td>
                                <NumericFormat
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    prefix={'$'}
                                    value={item.unitPrice}
                                    onValueChange={(values) => {
                                        const { value } = values;
                                        // Set the formatted value
                                        item.unitPrice = value;
                                    }}
                                />
                                {errors.items && errors.items[index] && errors.items[index].unitPrice && <span>This field is required</span>}
                            </td>
                            <td>
                                <NumericFormat
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    value={item.quantity}
                                    onValueChange={(values) => {
                                        const { value } = values;
                                        // Set the formatted value
                                        item.quantity = value;
                                    }}
                                />
                                {errors.items && errors.items[index].quantity && <span>This field is required</span>}
                            </td>
                            <td>${calculateAmount(index)}</td>
                            <td>
                                <button type="button" onClick={() => remove(index)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                    <button type="button" onClick={() => append({ unitPrice: '', quantity: '' })}>
                        Add Item
                    </button>
                </div>
                <div>
                    <label>
                        Total Amount:
                        <input type="text" readOnly value={calculateTotalAmount()} />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default InvoiceNew;