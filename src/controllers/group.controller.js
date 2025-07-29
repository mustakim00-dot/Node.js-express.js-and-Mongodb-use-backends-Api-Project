import { Group } from "../models/group.model.js";
import ApiError from "../utils/apiError.js";
import ApiSuccess from "../utils/apiSuccess.js";
import asyncHandler from "../utils/asyncHandler.js";
import { fileUpload } from "../utils/fileUpload.js";

const createGroup = asyncHandler(async (req,res ) => {
    const groupExists = await Group.findOne({
        $and: [{ name: req.body.name} , { createdBy: req.user._id }],
    });
    if(groupExists){
        throw ApiError.badRequest("Group name already exists");
    }

    const groupLogo = req.file;
    if (groupLogo) {
         const result = await fileUpload(groupLogo.path, {
           folder: 'groups',
           user_filename: true,
           resource_type: 'image',
           overwrite: true,
           //unique_filename: true,
           public_id: req.body.name + Date.now(),
         }); 
        req.body.image = {
            url: result.secure_url,
            public_id: result.public_id,
    };
};

    const group = await Group.create({ ...req.body, createdBy: req.user._id});
    return res.status(200).json(ApiSuccess.created("group created", group));
});

const addMember = asyncHandler(async (req, res) => {
    const { groupId } = req.params; 
    const { members } = req.body;
    const userId = req.user._id; 
    const groupExists = await Group.findById(groupId);
    if(!groupExists) {
        throw ApiError.notFound("Group not found");
    }
    if( userId.toString() != groupExists.createdBy.toString()) {
        throw ApiError.forbidden(" you are not authorized to add members to this group");
    }
    const newMembers = members.filter(member => {
        return groupExists.members.includes(member) === false;
    });
    if(newMembers.length === 0){
        throw ApiError.badRequest("No new numbers to add");
    }
    groupExists.members = [ ...groupExists.members, ...newMembers];
    
    await groupExists.save();
    return res.status(200).json(ApiSuccess.created(" Members added to group", groupExists));

});

export { addMember, createGroup };

