import {useForm,useFieldArray} from "react-hook-form";
import {updateInvoice} from "../../../services/invoiceService";


function InvoiceForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });

    const addItem = () => {
        append({ unitPrice: '', quantity: 1 });
    };
    const onSubmit = (data) => {
        // convert amount and unit prices to numbers
        const amount = parseFloat(data.amount.replace(/[^0-9.-]+/g,""));
        const items = data.items.map(item => ({
            ...item,
            unitPrice: parseFloat(item.unitPrice.replace(/[^0-9.-]+/g,""))
        }));

        // create the invoice object
        const invoice = {
            contractId: data.contractId,
            issuedDate: data.issuedDate,
            dueDate: data.dueDate,
            status: data.status,
            amount,
            items
        };

        // submit the invoice to the server
        updateInvoice(invoice.id,invoice)
            .then(response => {
                console.log("Invoice submitted successfully:", response);
                // handle success case here
            })
            .catch(error => {
                console.error("Failed to submit invoice:", error);
                // handle error case here
            });
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="contractId">Contract ID</label>
                <input type="text" id="contractId" {...register('contractId', { required: true })} />
                {errors.contractId && <span>This field is required</span>}
            </div>

            <div>
                <label htmlFor="issuedDate">Issued Date</label>
                <input type="date" id="issuedDate" {...register('issuedDate', { required: true })} />
                {errors.issuedDate && <span>This field is required</span>}
            </div>

            <div>
                <label htmlFor="dueDate">Due Date</label>
                <input type="date" id="dueDate" {...register('dueDate', { required: true })} />
                {errors.dueDate && <span>This field is required</span>}
            </div>

            <div>
                <label htmlFor="status">Status</label>
                <select id="status" {...register('status', { required: true })}>
                    <option value="PENDING">Pending</option>
                    <option value="PAID">Paid</option>
                </select>
                {errors.status && <span>This field is required</span>}
            </div>

            {fields.map((item, index) => (
                <div key={item.id}>
                    <label htmlFor={`items.${index}.unitPrice`}>Unit Price</label>
                    <input
                        type="text"
                        id={`items.${index}.unitPrice`}
                        {...register(`items.${index}.unitPrice`, { required: true })}
                        defaultValue={item.unitPrice}
                    />
                    {errors.items && errors.items[index] && errors.items[index].unitPrice && (
                        <span>This field is required</span>
                    )}

                    <label htmlFor={`items.${index}.quantity`}>Quantity</label>
                    <input
                        type="number"
                        id={`items.${index}.quantity`}
                        {...register(`items.${index}.quantity`, { required: true, valueAsNumber: true })}
                        defaultValue={item.quantity}
                    />
                    {errors.items && errors.items[index] && errors.items[index].quantity && (
                        <span>This field is required</span>
                    )}

                    <button type="button" onClick={() => remove(index)}>
                        Remove Item
                    </button>
                </div>
            ))}

            <button type="button" onClick={addItem}>
                Add Item
            </button>

            <button type="submit">Submit</button>
        </form>
    );
}
export default InvoiceForm;
