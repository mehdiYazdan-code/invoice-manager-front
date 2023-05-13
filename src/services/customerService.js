import axios from 'axios';

const http = axios.create({
    baseURL : 'http://localhost:8080/api/customers',
    headers: { 'Content-Type': 'application/json' },
})

function CustomerService () {
    const getAllCustomers = async() => {
        return await http.get("/");
    }

    const getCustomerById = async (id) => {
        return await http.get(`/${id}`);
    }

    const createCustomer = async (model) => {
        return await http.post("/",model);
    }

    const updateCustomer = async (id,model) => {
        return await http.put(`/${id}`,model)
    }

    const deleteCustomer = async (id) => {
        return await http.delete(id);
    }
};

export default CustomerService;
