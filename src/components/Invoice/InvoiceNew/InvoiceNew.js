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

function toShamsi(date) {
    return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
}


const parseNumber = (number) => {
    return parseInt(number.replace(/^0+/, '').replace(/,/g, ''));
};


const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const model = {
    id: 0,
    explanation: "",
    date: new Date(),
    reportItems: [
        {
            id: 0,
            inventory_paper: "",
            productCode: "",
            unitPrice: 0,
            quantity: 0,
            customerId: null
        }
    ]
}

const ReportCreateForm = () => {
    const navigate = useNavigate();
    const [report, setReport] = useState({
                ...model,
                date: new Date(),
                reportItems: model.reportItems.map((item) => ({
                    ...item,
                    unitPrice: formatNumber(item.unitPrice),
                    quantity: formatNumber(item.quantity),
                    amount: item.unitPrice * item.quantity,
                }))
            })
    const [date, setDate] = useState(report.date);
    const [customers, setCustomers] = useState([])
    const handleExplanation = (e) => {
        setReport({...report, "explanation": e.target.value})
    }

    const handleInputChange = (event, index) => {
        const {name, value} = event.target;
        const newItems = [...report.reportItems];
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
        setReport({...report, reportItems: newItems});
    };


    const handleAddItem = () => {
        const newItems = [
            ...report.reportItems,
            {id: 0, customerId: 0, unitPrice: '0', quantity: '0', amount: 0},
        ];
        setReport({...report, reportItems: newItems});
    };

    const handleRemoveItem = (index) => {
        const newItems = [...report.reportItems];
        newItems.splice(index, 1);
        setReport({...report, reportItems: newItems});
    };

    const getTotalAmount = () => {
        return report.reportItems.reduce((total, item) => total + item.amount, 0);
    };
    const handleDateChange = (d) => {
        setDate(d?.isValid ? d.toDate() : "");
    };
    const hadleRemoveReport = async (e) => {
        e.preventDefault()
        await deleteInvoice(report.id).then(r => console.log(r)).catch(error => console.log(error))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const parsedItems = report.reportItems.map((item) => {
            return {
                ...item,
                unitPrice: parseInt(item.unitPrice.replace(/,/g, '')),
                quantity: parseInt(item.quantity.replace(/,/g, ''))
            };
        });
        const formData = {
            ...report,
            date: new DateObject(date).format("YYYY-MM-DD"),
            reportItems: parsedItems
        }
        await createInvoice(formData).then(response => {
            if (response.status === 200) navigate(-1)
        })
        console.log(formData);
    };
    useEffect(() => {
        async function loader() {
            return await getCustomerDropDownList()
        }
        loader().then((data) => {
            setCustomers(data)
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
                <h5 style={{fontFamily: "IRANSansBold"}}>گزارش روزانه تولید</h5>
            </div>
            <div style={{
                display: "flex",
                marginTop: "5px",
                border: "1px solid lightgray",
                borderRadius: "5px",
                height: "120px",
                width: "100%",
                padding: "10px"
            }}
            >
                <div style={{margin: "0 5px"}}>
                    <label htmlFor="date">تاریج:</label>
                    <DatePicker
                        id="date"
                        name="date"
                        type="text"
                        format="YYYY/MM/DD"
                        calendar={persian}
                        locale={persian_fa}
                        value={toShamsi(date)}
                        onChange={handleDateChange}
                        className="custom-datepicker"
                        inputClass="custom-datepicker-input"
                        calendarClass="custom-datepicker-calendar"
                    />
                </div>
                <div style={{margin: "0 5px", width: "100%"}}>
                    <label htmlFor="explanation">شرح گزارش:</label>
                    <input
                        type="text"
                        id="explanation"
                        name="explanation"
                        value={report.explanation}
                        onChange={handleExplanation}
                    />
                </div>
            </div>
            <button className="btn" onClick={handleAddItem}>
                <IconAddCircleLine fontSize={35}/>
            </button>
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                    <tr>
                        <th>شرکت</th>
                        <th>حواله انبار</th>
                        <th>کد کالا</th>
                        <th>قیمت واحد(ریال)</th>
                        <th>تعداد</th>
                        <th>مبلغ(ریال)</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {report.reportItems.map((item, index) => (
                        <tr key={item.id}>
                            <td>
                                <select
                                    type="select"
                                    id={`customerId-${index}`}
                                    name="customerId"
                                    value={item.customerId}
                                    onChange={(event) => handleInputChange(event, index)}
                                    required
                                >
                                    {customers.map(customer => <option value={customer.id}>{customer.name}</option>)}
                                </select>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id={`inventory_paper-${index}`}
                                    name="inventory_paper"
                                    value={item.inventory_paper}
                                    onChange={(event) => handleInputChange(event, index)}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id={`productCode-${index}`}
                                    name="productCode"
                                    value={item.productCode}
                                    onChange={(event) => handleInputChange(event, index)}
                                    required
                                />
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
                        <td colSpan={5}>جمع کل(ریال)</td>
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
    );
};

export default ReportCreateForm;