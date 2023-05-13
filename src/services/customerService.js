import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/',
});

const CustomerService = {
    async getAllCustomers() {
        return await apiClient.get('/customers').then(response => response.data);
    },

   async getCustomerById(id) {
        return await apiClient.get(`/customers/${id}`);
    },

   async createCustomer(customer) {
        return await apiClient.post('/customers', customer);
    },

   async updateCustomer(id, customer) {
        return await apiClient.put(`/customers/${id}`, customer);
    },

   async deleteCustomer(id) {
        return await apiClient.delete(`/customers/${id}`);
    }
};

export default CustomerService;
