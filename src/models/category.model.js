import mongoose, { Schema } from "mongoose";

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
},
image: {
    url: {
        type: String,
        required: true,
    },
    public_id:{
        type: String,
        required: true,
    },
},
subcategories:[{
    type: Schema.Types.ObjectId,
    ref: 'Subcategory',

},
],
},
{
    timestamps:true,
})

// one to many relationship
export const Category = mongoose.models.Category || mongoose.model('Category', category);