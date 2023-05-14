import axios from 'axios';

const http = axios.create({
    baseURL : 'http://localhost:8080/api/addendums',
    headers: { 'Content-Type': 'application/json' },
})


const getAllAddendum = async () => await http.get("/");

const getAddendumById = async id => await http.get(`/${id}`);

const createAddendum = async model => await http.post("/", model);

const updateAddendum = async (id, model) => await http.put(`/${id}`, model);

const deleteAddendum = async id => await http.delete(id);



