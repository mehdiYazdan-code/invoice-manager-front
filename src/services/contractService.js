import axios from 'axios';

const baseURL = 'http://localhost:8080/api';

const contractService = {
    getAllContracts: async () => {
        try {
            const response = await axios.get(`${baseURL}/contracts`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    getContractById: async (id) => {
        try {
            const response = await axios.get(`${baseURL}/contracts/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    createContract: async (contractData) => {
        try {
            const response = await axios.post(`${baseURL}/contracts`, contractData);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    updateContract: async (id, contractData) => {
        try {
            const response = await axios.put(`${baseURL}/contracts/${id}`, contractData);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    deleteContract: async (id) => {
        try {
            const response = await axios.delete(`${baseURL}/contracts/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
};

export default contractService;
