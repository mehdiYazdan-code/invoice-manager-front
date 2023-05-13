import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080/api/contracts',
    headers: {'Content-Type': 'application/json'},
});

        export const getAllContracts = async () => await http.get("/");

        export const getContractById = async id => await http.get(`/${id}`);

        export const createContract = async model => await http.post("/", model);

        export const updateContract = async (id, model) => await http.put(`/${id}`, model);

        export const deleteContract = async id => await http.delete(id);


