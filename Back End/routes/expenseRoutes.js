const express = require("express");
const router = express.Router();
const { addExpense, getExpenses, getTotalExpenses, getTotalLosses } = require("../controller/expenseController");
const authenticate = require("../middleware/authenticate");

router.post("/add", authenticate, addExpense);
router.get("/", authenticate, getExpenses);
router.get("/total", authenticate, getTotalExpenses);
router.get("/losses", authenticate, getTotalLosses);

module.exports = router;
