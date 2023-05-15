import DatePicker, {DateObject} from "react-multi-date-picker";
import moment from "jalali-moment";
import "./InvoiceNew.css";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import IconAddCircleLine from "../../assets/icons/IconAddCircleLine";
import IconDeleteOutline from "../../assets/icons/IconDeleteOutline";
import {createInvoice, deleteInvoice} from "../../../services/invoiceService";
import {getContractDropDownList, getCustomerDropDownList} from "../../../services/dropDownService";
import {getAllInvoiceStatuses} from "../../../services/invoiceStatusService";
import {getAllBarrelTypes} from "../../../services/barrelTypeService";
import data from "bootstrap/js/src/dom/data";

function toShamsi(date) {
    return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
}


const parseNumber = (number) => {
    return parseInt(number.replace(/^0+/, '').replace(/,/g, ''));
};


const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


const InvoiceNew = (model) => {
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

    const [contracts, setContracts] = useState([]);
    const [contract, setContract] = useState({});
    const [statuses, setStatuses] = useState([]);
    const [barrelTypes, setBarrelTypes] = useState([]);

    const handleContractId = (e) => {
        setInvoice({...invoice, "contractId": e.target.value})
        setContract(contract)

    }

    useMemo((e) => {
        async function loadContractDropDown(customerId){
            return await getContractDropDownList(customerId);
        }
        loadContractDropDown(invoice.customerId).then(data => {
            console.log("useCallBack: ",data)
            setContracts(data)
        })
    }, [invoice.customerId]);

    const handleCustomerId = (e) => {
        setInvoice({...invoice, "customerId": e.target.value})
    };
    const handleStatusId = (e) => {
        setInvoice({...invoice, "statusId": e.target.value})
    }

    useEffect(() => {
        async function loader() {
            const customer_drop_down = await getCustomerDropDownList();
            const status_drop_down = await getAllInvoiceStatuses();
            const barrel_types_drop_down = await getAllBarrelTypes();
            const contract_drop_down = await getContractDropDownList(invoice.customerId);
            return {customer_drop_down, status_drop_down, barrel_types_drop_down, contract_drop_down}
        }

        loader().then((data) => {
            setCustomers(data.customer_drop_down);
            setStatuses(data.status_drop_down);
            setBarrelTypes(data.barrel_types_drop_down);
            setContracts(data.contract_drop_down);
        })
    }, [])


    return (
        <div style={{fontFamily: "IRANSans"}} className="invoice-new">
            <div>
               title
            </div>
            <div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div style={{display: "flex"}}>
                        <div style={{margin: "0 5px"}}>
                            <label htmlFor="issuedDate">تاریخ صدور:</label>
                            <DatePicker
                               ///...
                            />
                        </div>
                        <div style={{margin: "0 5px"}}>
                            <label htmlFor="issuedDate">تاریخ تسویه:</label>
                            <DatePicker
                                //..
                            />
                        </div>
                        <div style={{margin: "0 5px", width: "300px"}}>
                            <label htmlFor="statusId">وضعیت:</label>
                            <select
                                type="select"
                                id="statusId"
                                name="statusId"
                                value={invoice.statusId}
                                onChange={handleStatusId}
                                required
                            >
                                {statuses.map(status => <option value={status.id}>{status.name}</option>)}
                            </select>
                        </div>
                        <div style={{margin: "0 5px", width: "300px"}}>
                            <label htmlFor="customerId">کارفرما:</label>
                            <select
                                type="select"
                                id="customerId"
                                name="customerId"
                                value={invoice.customerId}
                                onChange={handleCustomerId}
                                required
                            >
                                {(invoice.customerId === 0 || invoice.customerId == null) && <option value={0}>انتخاب...</option>}
                                {customers.map(customer => <option value={customer.id}>{customer.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div style={{display: "flex"}}>

                        <div style={{margin: "0 5px", width: "100%", display:"flex"}}>
                            <div style={{margin: "0 5px", width: "100%"}}>
                                <label htmlFor="contractId">قرارداد:</label>
                                <select
                                    type="select"
                                    id="contractId"
                                    name="contractId"
                                    value={invoice.contractId}
                                    onChange={handleContractId}
                                    required
                                >
                                    {(!contracts) && <option value={0}>انتخاب...</option>}
                                    {contracts.map(contract => <option value={contract.id}>{contract.contractDescription}</option>)}
                                </select>
                            </div>
                            <div style={{margin: "0 5px", width: "100%"}}>
                                <label>مبلغ کل</label>
                                <input type="text" value={contract.totalAmount}/>
                            </div>
                            <div style={{margin: "0 5px", width: "100%"}}>
                                <label>تعداد کل</label>
                                <input type="text" value={contract.totalBarrels}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <form onSubmit={handleSubmit}>
                    <table>
                        ///...
                    </table>
                    <div >
                       ///...some buttons
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InvoiceNew;