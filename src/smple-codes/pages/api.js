import axios from 'axios';

// Set the base URL for your API
const API_BASE_URL = 'http://your-api-url.com/api';

// Create an instance of axios with the base URL
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Retrieve the JWT token from local storage
const token = localStorage.getItem('token');
if (token) {
    // Set the Authorization header for all requests
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Define your API endpoints
const apiEndpoints = {
    getCustomers: () => api.get('/customers'),
    getCustomerById: (customerId) => api.get(`/customers/${customerId}`),
    createCustomer: (customerData) => api.post('/customers', customerData),
    updateCustomer: (customerId, customerData) => api.put(`/customers/${customerId}`, customerData),
    deleteCustomer: (customerId) => api.delete(`/customers/${customerId}`),

    getContracts: () => api.get('/contracts'),
    getContractById: (contractId) => api.get(`/contracts/${contractId}`),
    createContract: (contractData) => api.post('/contracts', contractData),
    updateContract: (contractId, contractData) => api.put(`/contracts/${contractId}`, contractData),
    deleteContract: (contractId) => api.delete(`/contracts/${contractId}`),

    getAddendums: () => api.get('/addendums'),
    getAddendumById: (addendumId) => api.get(`/addendums/${addendumId}`),
    createAddendum: (addendumData) => api.post('/addendums', addendumData),
    updateAddendum: (addendumId, addendumData) => api.put(`/addendums/${addendumId}`, addendumData),
    deleteAddendum: (addendumId) => api.delete(`/addendums/${addendumId}`),

    getInvoices: () => api.get('/invoices'),
    getInvoiceById: (invoiceId) => api.get(`/invoices/${invoiceId}`),
    createInvoice: (invoiceData) => api.post('/invoices', invoiceData),
    updateInvoice: (invoiceId, invoiceData) => api.put(`/invoices/${invoiceId}`, invoiceData),
    deleteInvoice: (invoiceId) => api.delete(`/invoices/${invoiceId}`),
};

export default apiEndpoints;
