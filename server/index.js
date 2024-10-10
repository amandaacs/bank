const express = require('express');
const mongoose = require('mongoose');
const  cors = require('cors');
const authRoute = require('../server/routes/authRoute')
const userRoutes = require('../server/routes/userRoutes')
const app = express();
require('dotenv').config();

//middlewares
app.use(cors({
    origin: 'https://bank-h2kt.onrender.com', // Update to your frontend's URL
    credentials: true,
}));

app.use(express.json());
 
//mdb connection
const dbURI = process.env.MONGODB_URI;

//route
app.use('/api/auth', authRoute);
app.use('/api', userRoutes);



//mongodb connection
mongoose
    .connect(dbURI)
    .then(() => console.log('connected!'))
    .catch((error) => console.error('failed to connect: ', error));



//global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => { 
    console.log(`app running on port ${PORT}`);
}); 
