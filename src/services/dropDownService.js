import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080/api/drop-down',
    headers: {'Content-Type': 'application/json'},
});

export const getCustomerDropDownList = async () => await http.get("/customers").then(response => response.data);



