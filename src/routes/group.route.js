import e from 'express';
import { addMember, createGroup } from '../controllers/group.controller.js';
import auth from '../middlewares/auth.middleware.js';
import upload from '../middlewares/fileUpload.middleware.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import { addGroupMembersSchema, createGroupSchema } from '../validators/group.validators.js';


const router = e.Router();
router.route('/groups').post(auth, upload.single('image'), validationMiddleware(createGroupSchema),createGroup)
router.route('/groups/members/:groupId').post(auth, validationMiddleware(addGroupMembersSchema), addMember);


export default router;