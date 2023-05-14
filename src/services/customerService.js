import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080/api/customers',
    headers: {'Content-Type': 'application/json'},
});

export const getAllCustomers = async () => await http.get("/");

export const getCustomerById = async id => await http.get(`/${id}`);

export const createCustomer = async model => await http.post("/", model);

export const updateCustomer = async (id, model) => await http.put(`/${id}`, model);

export const deleteCustomer = async id => await http.delete(id);


