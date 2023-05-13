import axios from 'axios';

const baseURL = 'http://localhost:8080/api/addendums';

const AddendumService = {
    getAllAddendums: async () => {
        try {
            const response = await axios.get(baseURL);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    getAddendumById: async (id) => {
        try {
            const response = await axios.get(`${baseURL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    createAddendum: async (addendum) => {
        try {
            const response = await axios.post(baseURL, addendum);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    updateAddendum: async (id, addendum) => {
        try {
            const response = await axios.put(`${baseURL}/${id}`, addendum);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    deleteAddendum: async (id) => {
        try {
            const response = await axios.delete(`${baseURL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default AddendumService;
