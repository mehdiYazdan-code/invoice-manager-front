import axios from 'axios';

const http = axios.create({
    baseURL : 'http://localhost:8080/api/addendums',
    headers: { 'Content-Type': 'application/json' },
})

function AddendumService () {
    const getAllAddendum = async() => {
        return await http.get("/");
    }

    const getAddendumById = async (id) => {
        return await http.get(`/${id}`);
    }

    const createAddendum = async (model) => {
        return await http.post("/",model);
    }

    const updateAddendum = async (id,model) => {
        return await http.put(`/${id}`,model)
    }

    const deleteAddendum = async (id) => {
        return await http.delete(id);
    }
};

export default AddendumService;
