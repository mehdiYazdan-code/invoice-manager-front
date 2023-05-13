import axios from 'axios';

const http = axios.create({
    baseURL : 'http://localhost:8080/api/invoices',
    headers: { 'Content-Type': 'application/json' },
})

const InvoiceService = () => {
    const getAllInvoices = async() => {
        return await http.get("/");
    }

    const getInvoiceById = async (id) => {
        return await http.get(`/${id}`);
    }

    const createInvoice = async (model) => {
        return await http.post("/",model);
    }

    const updateInvoice = async (id,model) => {
        return await http.put(`/${id}`,model)
    }

    const deleteInvoice = async (id) => {
        return await http.delete(id);
    }
}
export default InvoiceService;
