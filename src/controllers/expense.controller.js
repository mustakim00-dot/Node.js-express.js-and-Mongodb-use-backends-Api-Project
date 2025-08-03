import { Expense } from "../models/expense.model.js";
import ApiSuccess from "../utils/apiSuccess.js";
import asyncHandler from "../utils/asyncHandler.js";


const createMyExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.create({
        ...req.body,
        createdBy: req.user._id   
    });
    return res.status(200).json(ApiSuccess.created('Expense created ', expense));
});

export { createMyExpense };
