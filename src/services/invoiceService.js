import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/invoices';

const getAllInvoices = () => {
    return axios.get(baseUrl).then((response) => response.data);
};

const createInvoice = (newInvoice) => {
    return axios.post(baseUrl, newInvoice).then((response) => response.data);
};

const updateInvoice = (id, updatedInvoice) => {
    return axios
        .put(`${baseUrl}/${id}`, updatedInvoice)
        .then((response) => response.data);
};

const deleteInvoice = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const getInvoiceById = (id) => {
    return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

const invoiceService = {
    getAllInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceById,
};

export default invoiceService;
