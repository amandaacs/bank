const express = require('express');
const mongoose = require('mongoose');
const  cors = require('cors');
const authRoute = require('../server/routes/authRoute')
const userRoutes = require('../server/routes/userRoutes')
const app = express();
require('dotenv').config();

const corsOptions = {
    origin: 'https://your-frontend-url.onrender.com', // Replace with your actual frontend URL
    credentials: true,
};

app.use(cors(corsOptions));
//middlewares

app.use(express.json());
 
//mdb connection
const dbURI = process.env.MONGODB_URI;

//route

app.get('/', (req, res) => {
    res.send('API is running!');
});
app.use('/api/auth', authRoute);
app.use('/api', userRoutes);



//mongodb connection
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error) => {
        console.error('Failed to connect:', error);
        // Log the full error object to see more details
        console.error('Error details:', JSON.stringify(error, null, 2));
    });



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
