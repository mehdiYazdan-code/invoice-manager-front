import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';

const items = [
    {description: 'Item 1', quantity: 10, unitPrice: 100},
    {description: 'Item 2', quantity: 5, unitPrice: 200},
    {description: 'Item 3', quantity: 3, unitPrice: 150},
];

function Invoice(props) {
    const {invoiceNumber, date, customerName} = props;

    const [hasVat, setHasVat] = useState(false);
    const [hasPrepayment, setHasPrepayment] = useState(false);
    const [hasInsuranceDeposit, setHasInsuranceDeposit] = useState(false);
    const [adjustmentFactor, setAdjustmentFactor] = useState(1);

    const itemList = items.map((item, index) => (
        <tr key={index}>
            <td>{item.description}</td>
            <td>{item.quantity}</td>
            <td>{item.unitPrice}</td>
            <td>{item.quantity * item.unitPrice}</td>
        </tr>
    ));

    const totalAmount = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    const totalAmountWithVat = hasVat ? totalAmount * 1.09 : totalAmount;
    const prepayment = hasPrepayment ? totalAmount * 0.25 : 0;
    const insuranceDeposit = hasInsuranceDeposit ? totalAmount * 0.05 : 0;
    const adjustedAmount = totalAmountWithVat * adjustmentFactor;
    const remainingAmount = adjustedAmount - prepayment - insuranceDeposit;

    return (
        <div>
            <h2>Invoice #{invoiceNumber}</h2>
            <p>Date: {date}</p>
            <p>Customer Name: {customerName}</p>
            <Table>
                <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>{itemList}</tbody>
                <tfoot>
                <tr>
                    <td colSpan="3">Total Amount:</td>
                    <td>{totalAmount}</td>
                </tr>
                <tr>
                    <td colSpan="3">Total Amount with VAT:</td>
                    <td>{totalAmountWithVat}</td>
                </tr>
                <tr>
                    <td colSpan="3">
                        <label>
                            <input
                                type="checkbox"
                                checked={hasPrepayment}
                                onChange={() => setHasPrepayment(!hasPrepayment)}
                            />
                            Prepayment:
                        </label>
                    </td>
                    <td>({prepayment})</td>
                </tr>
                <tr>
                    <td colSpan="3">
                        <label>
                            <input
                                type="checkbox"
                                checked={hasInsuranceDeposit}
                                onChange={() => setHasInsuranceDeposit(!hasInsuranceDeposit)}
                            />
                            Insurance Deposit:
                        </label>
                    </td>
                    <td>({insuranceDeposit})</td>
                </tr>
                <tr>
                    <td colSpan="3">
                        <label>
                            <input
                                type="checkbox"
                                checked={hasVat} onChange={() => setHasVat(!hasVat)}
                            />
                            VAT (9%):
                        </label>
                    </td>
                    <td>{totalAmount * 0.09}</td>
                </tr>
                <tr>
                    <td colSpan="3">
                        <label>
                            Adjustment Factor:
                            <input
                                type="number"
                                min="0.1"
                                step="0.1"
                                value={adjustmentFactor}
                                onChange={(e) => setAdjustmentFactor(e.target.value)}
                            />
                        </label>
                    </td>
                    <td>{adjustedAmount}</td>
                </tr>
                <tr>
                    <td colSpan="3">Remaining Amount:</td>
                    <td>{remainingAmount}</td>
                </tr>
                </tfoot>
            </Table>
        </div>
    );
}

export default Invoice;
