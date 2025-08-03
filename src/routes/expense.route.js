import e from 'express';
import { createMyExpense } from '../controllers/expense.controller.js';
import auth from '../middlewares/auth.middleware.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import { createIndividualExpenseSchema } from '../validators/expense.validators.js';
const router = e.Router();
router.route("/expenses/individual").post(auth,validationMiddleware(createIndividualExpenseSchema), createMyExpense )

export default router;
