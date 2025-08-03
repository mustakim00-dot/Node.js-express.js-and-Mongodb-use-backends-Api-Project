import {z} from 'zod';

const createIndividualExpenseSchema = z.object({
    amount: z.number(),
    description: z.string().optional(),
    category: z.string(),
    subcategory: z.string(),
    date: z.string() 
});

export { createIndividualExpenseSchema };