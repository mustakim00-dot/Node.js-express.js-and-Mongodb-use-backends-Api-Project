import { z } from 'zod';

const createSubCategorySchema = z.object({
    name: z.string(),
    slug: z.string().optional(),
    category:z.string(),
});

const subcategoryImageSchema = z.object({
    image: z.any(),
});

export { subcategoryImageSchema, createSubCategorySchema };

