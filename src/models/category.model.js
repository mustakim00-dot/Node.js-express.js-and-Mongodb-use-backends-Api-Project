import mongoose, { Schema } from "mongoose";
//import { Subcategory } from "./subcategory.model.js";

const category = new Schema({
name: {
    type: String,
    required: true,
    unique: true,
},
slug:{
    type: String,
    //required: true,
    unique: true,
    index: true,
},
image: {
    url: {
        type: String,
        //required: true,
    },
    public_id:{
        type: String,
        //required: true,
    },
},
// subcategories:[{
//     type: Schema.Types.ObjectId,
//     ref: 'Subcategory',

// },
// ],
createdBy : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
},
},
{
    timestamps:true,
});

// category.pre('remove',async function (next) {
// try{
//     //console.log(`Deleting subcategories for category : ${this._id}`);
//     await Subcategory.deleteMany({ category: this._id });
//     next();
// }catch (err){
//     next(err);
// }
// });

// one to many relationship
export const Category = mongoose.models.Category || mongoose.model('Category', category);