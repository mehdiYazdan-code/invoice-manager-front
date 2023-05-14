import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080/api/invoices',
    headers: {'Content-Type': 'application/json'},
});

export const getAllInvoices = async () => await http.get("/");

export const getInvoiceById = async id => await http.get(`/${id}`);

export const createInvoice = async model => await http.post("/", model);

export const updateInvoice = async (id, model) => await http.put(`/${id}`, model);

export const deleteInvoice = async id => await http.delete(id);


