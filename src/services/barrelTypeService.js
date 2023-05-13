import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080/api/barrel-types',
    headers: {'Content-Type': 'application/json'},
});

export const getAllBarrelTypes = async () => await http.get("/");

export const getBarrelTypeById = async id => await http.get(`/${id}`);

export const createBarrelType = async model => await http.post("/", model);

export const updateBarrelType = async (id, model) => await http.put(`/${id}`, model);

export const deleteBarrelType = async id => await http.delete(id);


