const express = require('express');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ExpenseTrackerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection failed:', err);
});

app.use('/api', userRoutes);
app.use('/api/expenses', expenseRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
