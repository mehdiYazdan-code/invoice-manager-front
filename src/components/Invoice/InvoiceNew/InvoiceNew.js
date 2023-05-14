import DatePicker, {DateObject} from "react-multi-date-picker";
import moment from "jalali-moment";
import "./InvoiceNew.css";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import IconAddCircleLine from "../../assets/icons/IconAddCircleLine";
import IconDeleteOutline from "../../assets/icons/IconDeleteOutline";
import {createInvoice, deleteInvoice} from "../../../services/invoiceService";
import {getCustomerDropDownList} from "../../../services/dropDownService";
import {getAllInvoiceStatuses} from "../../../services/invoiceStatusService";

function toShamsi(date) {
    return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
}


const parseNumber = (number) => {
    return parseInt(number.replace(/^0+/, '').replace(/,/g, ''));
};


const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


const InvoiceNew = () => {
    const model = {
        id: 0,
        contractId: 0,
        explanation: "",
        issuedDate: new Date(),
        dueDate: new Date(),
        customerId: 0,
        items: [
            {
                id: 0,
                unitPrice: 0,
                quantity: 0,
            }
        ]
    }
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState({
        ...model,
        issuedDate: new Date(),
        dueDate: new Date(),
        items: model.items.map((item) => ({
            ...item,
            unitPrice: formatNumber(item.unitPrice),
            quantity: formatNumber(item.quantity),
            amount: item.unitPrice * item.quantity,
        }))
    })
    const [issuedDate, setIssuedDate] = useState(invoice.issuedDate);
    const [dueDate, setDueDate] = useState(invoice.dueDate);

    const [customers, setCustomers] = useState([]);
    const [statuses, setStatuses] = useState([]);


    const handleExplanation = (e) => {
        setInvoice({...invoice, "explanation": e.target.value})
    }
    const handleCustomerId = (e) => {
        setInvoice({...invoice, "customerId": e.target.value})
    }

    const handleInputChange = (event, index) => {
        const {name, value} = event.target;
        const newItems = [...invoice.items];
        newItems[index][name] = value;
        if (name === 'unitPrice' || name === 'quantity') {
            const intValue = parseInt(value.replace(/,/g, ''));
            if (!isNaN(intValue) && intValue >= 0) {
                newItems[index][name] = formatNumber(intValue);
                const quantityValue = parseInt(newItems[index].quantity.replace(/,/g, ''));
                const unitPriceValue = parseInt(newItems[index].unitPrice.replace(/,/g, ''));
                newItems[index].amount = quantityValue * unitPriceValue;
            }
        }
        setInvoice({...invoice, items: newItems});
    };


    const handleAddItem = () => {
        const newItems = [
            ...invoice.items,
            {id: 0, unitPrice: '0', quantity: '0', amount: 0},
        ];
        setInvoice({...invoice, items: newItems});
    };

    const handleRemoveItem = (index) => {
        const newItems = [...invoice.items];
        newItems.splice(index, 1);
        setInvoice({...invoice, items: newItems});
    };

    const getTotalAmount = () => {
        return invoice.items.reduce((total, item) => total + item.amount, 0);
    };
    const handleIssuedDateChange = (d) => {
        setIssuedDate(d?.isValid ? d.toDate() : "");
    };
    const handleDueDateChange = (d) => {
        setDueDate(d?.isValid ? d.toDate() : "");
    };
    const hadleRemoveReport = async (e) => {
        e.preventDefault()
        await deleteInvoice(invoice.id).then(r => console.log(r)).catch(error => console.log(error))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const parsedItems = invoice.items.map((item) => {
            return {
                ...item,
                unitPrice: parseInt(item.unitPrice.replace(/,/g, '')),
                quantity: parseInt(item.quantity.replace(/,/g, ''))
            };
        });
        const formData = {
            ...invoice,
            issuedDate: new DateObject(issuedDate).format("YYYY-MM-DD"),
            dueDate: new DateObject(issuedDate).format("YYYY-MM-DD"),
            items: parsedItems
        }
        await createInvoice(formData).then(response => {
            if (response.status === 200) navigate("/invoices")
        })
        console.log(formData);
    };
    useEffect(() => {
        async function loader() {
            const customer_drop_down = await getCustomerDropDownList();
            const status_drop_down = await getAllInvoiceStatuses();
            return {customer_drop_down, status_drop_down}
        }

        loader().then((data) => {
            setCustomers(data.customer_drop_down);
            setStatuses(data.status_drop_down);

        })

    }, [])


    return (
        <div style={{fontFamily: "IRANSans"}} className="invoice-new">
            <div style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid lightgray",
                borderRadius: "5px",
                width: "100%",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#f5f6f7"
            }}>
                <h3 style={{fontFamily: "IRANSansBold"}}>شرکت پارس پرند حیان</h3>
                <h5 style={{fontFamily: "IRANSansBold"}}>صورت حساب فروش بشکه</h5>
            </div>
            <div style={{
                display: "flex",
                flexDirection:"column",
                marginTop: "5px",
                border: "1px solid lightgray",
                borderRadius: "5px",
                height: "120px",
                width: "100%",
                padding: "10px"
            }}
            >
                <div  style={{display : "flex"}}>
                    <div style={{margin: "0 5px"}}>
                        <label htmlFor="issuedDate">تاریخ صدور:</label>
                        <DatePicker
                            id="issuedDate"
                            name="issuedDate"
                            type="text"
                            format="YYYY/MM/DD"
                            calendar={persian}
                            locale={persian_fa}
                            value={toShamsi(issuedDate)}
                            onChange={handleIssuedDateChange}
                            className="custom-datepicker"
                            inputClass="custom-datepicker-input"
                            calendarClass="custom-datepicker-calendar"
                        />
                    </div>
                    <div style={{margin: "0 5px"}}>
                        <label htmlFor="issuedDate">تاریخ تسویه:</label>
                        <DatePicker
                            id="issuedDate"
                            name="issuedDate"
                            type="text"
                            format="YYYY/MM/DD"
                            calendar={persian}
                            locale={persian_fa}
                            value={toShamsi(issuedDate)}
                            onChange={handleDueDateChange}
                            className="custom-datepicker"
                            inputClass="custom-datepicker-input"
                            calendarClass="custom-datepicker-calendar"
                        />
                    </div>
                    <div style={{margin: "0 5px", width: "300px"}}>
                        <label htmlFor="explanation">وضعیت:</label>
                        <select
                            type="select"
                            id="customerId"
                            name="customerId"
                            value={1}
                            onChange={handleCustomerId}
                            required
                        >
                            {statuses.map(customer => <option value={customer.id}>{customer.name}</option>)}
                        </select>
                    </div>
                    <div style={{margin: "0 5px", width: "300px"}}>
                        <label htmlFor="explanation">کارفرما:</label>
                        <select
                            type="select"
                            id="customerId"
                            name="customerId"
                            value={1}
                            onChange={handleCustomerId}
                            required
                        >
                            {customers.map(customer => <option value={customer.id}>{customer.name}</option>)}
                        </select>
                    </div>
                </div>
                <div style={{display : "flex"}}>

                </div>
            </div>
            <div className="row">
                <button className="btn" onClick={handleAddItem}>
                    <IconAddCircleLine fontSize={35}/>
                </button>
            </div>
            <div className="container-fluid">
                <form onSubmit={handleSubmit}>
                    <table >
                        <thead>
                        <tr>
                            <th>شرح آیتم</th>
                            <th>قیمت واحد(ریال)</th>
                            <th>تعداد</th>
                            <th>مبلغ(ریال)</th>
                            <th>عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {invoice.items.map((item, index) => (
                            <tr key={item.id}>
                                <td>
                                    <input type="text"/>
                                </td>
                                <td>
                                    <input
                                        style={{fontFamily: "IRANSans"}}
                                        type="text"
                                        name="unitPrice"
                                        value={item.unitPrice}
                                        onChange={(event) => handleInputChange(event, index)}
                                        pattern="[0-9,]*"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="quantity"
                                        value={item.quantity}
                                        onChange={(event) => handleInputChange(event, index)}
                                        pattern="[0-9,]*"
                                    />
                                </td>
                                <td>{formatNumber(parseInt(item.unitPrice.replace(/,/g, '')) * parseInt(item.quantity.replace(/,/g, '')))}</td>
                                <td>
                                    <button className="btn" onClick={() => handleRemoveItem(index)}>
                                        <IconDeleteOutline size={30}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan={3}>جمع کل(ریال)</td>
                            <td colSpan={2}>{formatNumber(getTotalAmount())}</td>
                        </tr>
                        </tfoot>
                    </table>
                    <div className="col mt-2" style={{fontFamily: "IRANSansMedium"}}>
                        <button type="submit" className="btn btn-outline-success">ثبت</button>
                        <button className="btn btn-outline-warning" onClick={() => navigate("/reports")}>برگشت</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InvoiceNew;