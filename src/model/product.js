import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//Index for searching title
productSchema.index({ title: "text" });

const Products = mongoose.model("Products", productSchema);

//Khởi tạo index
Products.createIndexes({ title: "text" });

export default Products;
