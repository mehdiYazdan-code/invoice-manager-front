import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerList from './pages/CustomerList';
import CustomerDetails from './pages/CustomerDetails';
import ContractList from './pages/ContractList';
import ContractDetails from './pages/ContractDetails';
import AddendumList from './pages/AddendumList';
import AddendumDetails from './pages/AddendumDetails';
import InvoiceList from './pages/InvoiceList';
import InvoiceDetails from './pages/InvoiceDetails';
import Sidebar from "./Sidebar";

const App = () => {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Routes>
                    <Route path="/customers" element={<CustomerList />} />
                    <Route path="/customers/:id" element={<CustomerDetails />} />
                    <Route path="/contracts" element={<ContractList />} />
                    <Route path="/contracts/:id" element={<ContractDetails />} />
                    <Route path="/addendums" element={<AddendumList />} />
                    <Route path="/addendums/:id" element={<AddendumDetails />} />
                    <Route path="/invoices" element={<InvoiceList />} />
                    <Route path="/invoices/:id" element={<InvoiceDetails />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
