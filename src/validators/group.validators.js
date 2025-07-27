import { z } from "zod";

const createGroupSchema = z.object({
    name: z.string(),
    //slug: z.string().optional(),
});

export { createGroupSchema };
