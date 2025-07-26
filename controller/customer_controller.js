const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'afsd_express'
})

connection.connect()

const saveCustomer = (req, res) => {
    connection.query('INSERT INTO customer (name, email, address) VALUES (?, ?, ?)', 
        [req.body.name, req.body.email, req.body.address], (error, rows) => {
            if (error) throw error;
            res.send(rows)
        });
}

const deleteCustomer = (req, res) => {
    connection.query('DELETE FROM customer WHERE customer_id = ?', [req.params.customer_id], (error, rows) => {
        if (error) throw error;
        res.send(rows)
    });
}

const getAllCustomer = (req, res) => {
    connection.query('SELECT * FROM customer', (error, rows) => {
        if (error) throw error;
        res.send(rows);
    });
}

const updateCustomer = (req, res) => {
    connection.query('UPDATE customer SET name = ?, email = ?, address = ? WHERE customer_id = ?', 
        [req.body.name, req.body.email, req.body.address, req.params.customer_id], (error, rows) => {
            if (error) throw error;
            res.send(rows)
        });
}

const getCustomerById = (req, res) => {
    connection.query('SELECT * FROM customer WHERE customer_id = ?', [req.body.customer_id], (error, rows) => {
        if (error) throw error;
        res.send(rows)
    });
}



module.exports = { saveCustomer, 
    deleteCustomer, getAllCustomer, updateCustomer, getCustomerById }