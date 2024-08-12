const Expense = require('../Models/expense');
const User = require('../Models/user');

exports.addExpense = async (req, res) => {
    const { description, amount } = req.body;
    try {
        const newExpense = new Expense({
            user: req.userId,
            description,
            amount
        });
        await newExpense.save();
        res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add expense', error: err.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.userId });
        res.status(200).json({ expenses });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch expenses', error: err.message });
    }
};

exports.getTotalExpenses = async (req, res) => {
    try {
        const total = await Expense.aggregate([
            { $match: { user: mongoose.Types.ObjectId(req.userId) } },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ]);
        res.status(200).json({ total: total[0]?.totalAmount || 0 });
    } catch (err) {
        res.status(500).json({ message: 'Failed to calculate total expenses', error: err.message });
    }
};

exports.getTotalLosses = async (req, res) => {
    try {
        const total = await Expense.aggregate([
            { $match: { user: mongoose.Types.ObjectId(req.userId), amount: { $lt: 0 } } },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ]);
        res.status(200).json({ total: total[0]?.totalAmount || 0 });
    } catch (err) {
        res.status(500).json({ message: 'Failed to calculate total losses', error: err.message });
    }
};
