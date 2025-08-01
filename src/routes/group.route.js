import e from 'express';
import { addMember, createGroup, deleteGroup, getGroups, getMyGroups, removeMember, updateGroup } from '../controllers/group.controller.js';
import auth from '../middlewares/auth.middleware.js';
import upload from '../middlewares/fileUpload.middleware.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import { createGroupSchema, groupMembersSchema } from '../validators/group.validators.js';


const router = e.Router();
router.route('/groups').post(auth, upload.single('image'), validationMiddleware(createGroupSchema),createGroup).delete(auth,deleteGroup).get(auth, getGroups);
router.route('/groups/my-groups').get(auth, getMyGroups);
router.route('/groups/:groupId').put(auth, upload.single('image'), validationMiddleware(createGroupSchema),updateGroup).delete(auth, deleteGroup);
router.route('/groups/members/:groupId').post(auth, validationMiddleware(groupMembersSchema), addMember).delete( auth, validationMiddleware(groupMembersSchema), removeMember);


export default router;