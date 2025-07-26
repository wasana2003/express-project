const express = require('express')
const app = express()
const port = 3000
const imageRoute = require('./routes/image_route');


// parse application/x-www-form-urlencoded
app.use(express.urlencoded())

// parse application/json
app.use(express.json())

const customerRoute = require('./routes/customer_route')
app.use("/api/v1/customer", customerRoute);

const userRoute = require('./routes/user_route');
app.use("/api/v1/user", userRoute);



app.use('/uploads', express.static('uploads'));
app.use('/api/v1/image', imageRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Server running on http://localhost:${port}`);

})

