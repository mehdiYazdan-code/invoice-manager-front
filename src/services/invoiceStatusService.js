import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080/api/invoice-statuses',
    headers: {'Content-Type': 'application/json'},
});

export const getAllInvoiceStatuses = async () => await http.get("/").then(response => response.data);

export const getInvoiceStatusById = async id => await http.get(`/${id}`);

export const createInvoiceStatus = async model => await http.post("/", model);

export const updateInvoiceStatus = async (id, model) => await http.put(`/${id}`, model);

export const deleteInvoiceStatus = async id => await http.delete(id);


