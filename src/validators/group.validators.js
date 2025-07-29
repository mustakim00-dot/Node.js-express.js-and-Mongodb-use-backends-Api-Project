import { z } from "zod";

const createGroupSchema = z.object({
    name: z.string(),
    //slug: z.string().optional(),
});

const addGroupMembersSchema = z.object({
    members : z.array(z.string()).min(1),
})

export { createGroupSchema, addGroupMembersSchema };
