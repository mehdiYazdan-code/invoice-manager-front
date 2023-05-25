import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ContractList from "./components/Contract/ContractList/ContractList";
import ContractForm from "./components/Contract/ContractForm/ContractForm";
import ContractNew from "./components/Contract/ContractNew/ContractNew";
import CustomerList from "./components/Customer/CustomerList/CustomerList";
import CustomerNew from "./components/Customer/CustomerNew/CustomerNew";
import CustomerForm from "./components/Customer/CustomerForm/CustomerForm";
import AddendumList from "./components/Addendum/AddendumList/AddendumList";
import AddendumForm from "./components/Addendum/AddendumForm/AddendumForm";
import AddendumNew from "./components/Addendum/AddendumNew/AddendumNew";
import InvoiceList from "./components/Invoice/InvoiceList/InvoiceList";
import InvoiceForm from "./components/Invoice/InvoiceForm/InvoiceForm";
import InvoiceNew from "./components/Invoice/InvoiceNew/InvoiceNew";
import "bootstrap/dist/css/bootstrap.min.css"
import BarrelType from "./components/BarrelType/BarrelType";
import Invoice from "./components/playground/Invoice";

function ProtectedRoute({component}) {
    // const { isAuthenticated } = useAuth();
    //
    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    return component;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route path="/" element={<ProtectedRoute component={<App/>} />}>
                  <Route path="/dashboard" index element={<ProtectedRoute component={<Dashboard />} />} />
                  <Route path="/contracts" element={<ProtectedRoute component={<ContractList />} />} />
                  <Route path="/contracts/:contractId" element={<ProtectedRoute component={<ContractForm />} />} />
                  <Route path="/contracts/create" element={<ProtectedRoute component={<ContractNew />} />} />
                  <Route path="/customers"  element={<ProtectedRoute component={<CustomerList />} />} />
                  <Route path="/customers/:customerId" element={<ProtectedRoute component={<CustomerForm />} />} />
                  <Route path="/customers/create" element={<ProtectedRoute component={<CustomerNew />} />} />
                  <Route path="/addendums"  element={<ProtectedRoute component={<AddendumList />} />} />
                  <Route path="/addendums/:addendumId" element={<ProtectedRoute component={<AddendumForm />} />} />
                  <Route path="/addendums/create" element={<ProtectedRoute component={<AddendumNew />} />} />
                  <Route path="/invoices"  element={<ProtectedRoute component={<InvoiceList />} />} />
                  <Route path="/invoices/:invoiceId" element={<ProtectedRoute component={<InvoiceForm />} />} />
                  <Route path="/invoices/create" element={<ProtectedRoute component={<InvoiceNew />} />} />
                  <Route path="/barrel-types" element={<ProtectedRoute component={<BarrelType />} />} />
                  <Route path="/playground" element={<ProtectedRoute component={<Invoice />} />} />
              </Route>
              {/*<Route  path="/login" element={<SignIn/>} />*/}
          </Routes>
      </Router>
  </React.StrictMode>
);
