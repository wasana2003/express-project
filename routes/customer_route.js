const express = require('express')
const route = express.Router()

const { saveCustomer, getAllCustomer, updateCustomer, deleteCustomer,
    getCustomerById } = require('../controller/customer_controller')

route.get('/', getAllCustomer);
route.post('/', saveCustomer);
route.put('/:id', updateCustomer);
route.delete('/:id', deleteCustomer);
route.get('/:id', getCustomerById);

module.exports = route;
