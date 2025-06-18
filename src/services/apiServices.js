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

    adminSearchBook: (data) => {
        return api.get(`/admin/find-sach?search=${data.search}`);
    },

    adminGetBookById: (id) => {
        return api.get(`/admin/sach/${id}`);
    },

    adminSale: (data) => {
        return api.post('/admin/ban-hang', data);
    },

    adminGetOrders: () => {
        return api.get('/admin/don-hang');
    },

    adminUpdateOrder: (id, data) => {
        return api.put(`/admin/update-don-hang/${id}`, data);
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

    shopGetBooks: () => {
        return api.get('/shop/sachs');
    },

    shopGetBookById: (id) => {
        return api.get(`/shop/sach/${id}`);
    },

    getOrders: () => {
        return api.get('/shop/don-hang');
    },

    addToCart: (data) => {
        return api.post('/shop/add-gio-hang', data);
    },

    getCart: () => {
        return api.get('/shop/gio-hang');
    },

    placeOrder: (data) => {
        return api.post('/shop/dat-hang', data);
    },
}



export default apiServices;
