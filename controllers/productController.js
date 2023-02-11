const Product = require("../models/productModel.js");
const expressAsyncHandler = require("express-async-handler");

// @desc   Get all products [ShopPage.js]
// @route  GET /products
// @access Public
const getAllProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find();

  // If no products
  if (!products) {
    return res.status(204).json({ message: "No products found." });
  }

  res.json(products);
});

// @desc   Get all products for admin inventory management [ProductListPage.js]
// @route  GET /products/admin
// @access Public
const getAdminProducts = expressAsyncHandler(async (req, res) => {
  const { query } = req;
  const page = query.page || 1;
  const pageSize = query.pageSize || PAGE_SIZE;

  const products = await Product.find()
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countProducts = await Product.countDocuments();

  res.json({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
});

const PAGE_SIZE = 3;

// @desc   Get search products [SearchPage.js]
// @route  GET /products/search
// @access Public
const searchProducts = expressAsyncHandler(async (req, res) => {
  const { query } = req;
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const price = query.price || "";
  const order = query.order || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};

  const categoryFilter = category && category !== "all" ? { category } : {};

  const priceFilter =
    price && price !== "all"
      ? {
          // 1-50
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const sortOrder =
    order === "featured"
      ? { featured: -1 }
      : order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const products = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
  });
  res.json({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
});

// @desc   Get product by categories [SearchPage.js]
// @route  GET /products/categories
// @access Public
const getProductCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Product.find().distinct("category");

  res.json(categories);
});

// @desc   Get a single product [ProductPage.js]
// @route  GET /products/slug/:slug
// @access Public
const getSingleProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  res.json(product);
});

// @desc   Get a single product by ID [Product.js, ProductPage.js, CartPage.js, ProductEditPage.js]
// @route  GET /products/:id
// @access Public
const getSingleProductID = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  res.json(product);
});

// @desc   Create a new product [ProductListPage.js]
// @route  POST /products
// @access Public
const createNewProduct = expressAsyncHandler(async (req, res) => {
  const newProduct = new Product({
    name: "sample name " + Date.now(),
    slug: "sample-name-" + Date.now(),
    image: "/images/shirts/s1.jpg",
    price: 1,
    category: "Shirts",
    brand: "New Brand",
    countInStock: 0,
    description: "New Product",
  });

  // Create and store new product
  const product = await newProduct.save();

  res.json({ message: "Product Created", product });
});

// @desc   Update a product [ProductEditPage.js]
// @route  PATCH /products/:id
// @access Public
const updateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    name,
    slug,
    image,
    brand,
    category,
    description,
    price,
    countInStock,
  } = req.body;

  // Confirm product ID
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  // Confirm data
  if (
    !name &&
    !slug &&
    !image &&
    !brand &&
    !category &&
    !description &&
    !price &&
    !countInStock
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if category is Shirts or Pants or Shoes or Outerwear
  if (
    category !== "Shirts" &&
    category !== "Pants" &&
    category !== "Shoes" &&
    category !== "Outerwear"
  ) {
    res.status(400);
    throw new Error("Category must be from one of the 4 options");
  }

  // Check if price is valid
  if (price <= 0) {
    res.status(400);
    throw new Error("Price must be greater than 0");
  }

  // Check if countInStock is valid
  if (countInStock < 0) {
    res.status(400);
    throw new Error("Count in stock must be greater than or equal to 0");
  }

  // Does the user exist to update?
  const product = await Product.findById(id).exec();
  if (!product) {
    res.status(400);
    throw new Error("No product matches ID");
  }

  // Check for duplicate
  const duplicate = await Product.findOne({ name })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original product
  if (duplicate && duplicate?._id.toString() !== id) {
    res.status(409);
    throw new Error("Duplicate product name");
  }

  product.name = name;
  product.slug = slug;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.description = description;
  product.price = price;
  product.countInStock = countInStock;

  // Create and store updated product
  const updatedProduct = await product.save();

  if (!updatedProduct) {
    res.status(400);
    throw new Error("Invalid product data");
  } else {
    res.json({ message: `${updatedProduct.name} updated` });
  }
});

// @desc   Delete a product [ProductListPage.js]
// @route  DELETE /products/:id
// @access Public
const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Product ID Required" });
  }

  // Does the product exist to delete?
  const product = await Product.findById(id).exec();
  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }

  // Delete product
  const result = await product.remove();

  const reply = `Product ${result.name} with ID ${result._id} deleted`;
  res.json(reply);
});

module.exports = {
  getAllProducts,
  getSingleProduct,
  getSingleProductID,
  deleteProduct,
  updateProduct,
  createNewProduct,
  getProductCategories,
  searchProducts,
  getAdminProducts,
};
