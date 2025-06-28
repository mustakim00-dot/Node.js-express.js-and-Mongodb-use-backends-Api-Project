import mongoose, { Schema } from "mongoose";

const subcategory = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// one to one relationship
export const Subcategory = mongoose.models.Subcategory || mongoose.model("Subcategory", subcategory);