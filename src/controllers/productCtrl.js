import Products from "../model/product.js";
import { apiFeatures } from "../lib/features.js";

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const features = new apiFeatures(Products.find(), req.query)
        .paginating()
        .sorting()
        .searching()
        .filtering();

      const counting = new apiFeatures(Products.find(), req.query)
        .searching()
        .filtering()
        .counting();

      const result = await Promise.allSettled([features.query, counting.query]);
      const products = result[0].status === "fulfilled" ? result[0].value : [];
      const count = result[1].status === "fulfilled" ? result[1].value : 0;

      return res.status(200).json({ products, count });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getProduct: async (req, res) => {
    console.log(req.params.id);
    try {
      const product = await Products.findById(req.params.id);
      if (!product)
        return res.status(404).json({ msg: "Product does not exist!" });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  addProduct: async (req, res) => {
    try {
      const newProduct = new Products(req.body);
      await newProduct.save();
      return res.status(200).json(newProduct);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, image, category, description, price } = req.body;
      const newProduct = Products.findByIdAndUpdate(
        req.params.id,
        {
          title,
          image,
          category,
          description,
          price,
        },
        { new: true }
      );
      if (!newProduct)
        return res.status(404).json({ msg: "Product does not exist!" });
      return res.status(200).json(newProduct);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await Products.findByIdAndDelete(req.params.id);
      if (!product)
        return res.status(404).json({ msg: "Product does not exist!" });
      return res.status(200).json({ msg: "Product has been deleted!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default productCtrl;
