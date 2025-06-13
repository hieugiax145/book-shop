import api from '../axios';

const apiServices = {
    login: (data) => {
        return api.post('/auth/login', data);
    },

    signup: (data) => {
        return api.put('/auth/signup', data);
    },

    adminAddBook: (data) => {
        return api.post('/admin/add-sach', data);
    },

    adminGetBooks: () => {
        return api.get('/admin/sachs');
    },

    adminGetBookById: (id) => {
        return api.get(`/admin/sach/${id}`);
    },

    findBook: (data) => {
        return api.get(`/admin/find-sach?search=${data.search}`);
    },

    adminUpdateBook: (id, data) => {
        return api.put(`/admin/update-sach/${id}`, data);
    },

    adminDeleteBook: (id) => {
        return api.delete(`/admin/delete-sach/${id}`);
    },

    adminGetOrders: () => {
        return api.get('/admin/orders');
    },
}



export default apiServices;
