const { Category } = require("../model/Category");
const { Product } = require("../model/Product");


exports.fetchProductsByCategory= async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.findAll({
      where: { CategoryId: categoryId },
      attributes: ["title", "price", "description", "stock"],
      });
    // Fetch the category label using a separate query
    const category = await Category.findByPk(categoryId, {
      attributes: ["label"], 
    });
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
   const categoryLabel = category ? category.label : null;

    // Combine the results
    const result = {
      categoryLabel,
      products,
    };

    res.json(result);
  //  res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchProductsById = async (req, res) => {
 try {
   const productId = req.params.productId;

   // Find the product by ID
   const product = await Product.findByPk(productId, {
     attributes: ["title", "price", "description", "stock"],
   });

   if (!product) {
     return res.status(404).json({ error: "Product not found" });
   }

   // Return the product details
   res.status(200).json(product);
 } catch (error) {
   console.error("Error fetching product details:", error);
   res.status(500).json({ error: "Internal Server Error" });
 }
};
