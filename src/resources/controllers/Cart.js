const models = require("../model/index");

exports.addtocart = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const user = await models.User.findByPk(userId);
    const product = await models.Product.findByPk(productId);
    if (!user || !product) {
      return res.status(404).json({ error: "User or Product not found" });
    }
    let userCart = await models.Cart.findOne({
      where: { user: userId, product: productId },
      include: [models.Product], // Include the associated Product model
    });
    if (userCart) {
      userCart.quantity += 1;
      await userCart.save();
    } else {
      userCart = await models.Cart.create({
        user: userId,
        product: productId,
        quantity: 1,
      });
    }

    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.viewcart = async (req, res) => {
  const { userId } = req.params;

  try {
    const userCart = await models.Cart.findOne({
      where: { user: userId },
      include: [
        { model: models.Product, attributes: ["id", "title", "price"] },
      ],
    });
    if (!userCart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    // Format the response as needed
    const formattedCart = userCart.map((userCart) => ({
      productId: userCart.Product.id,
      productName: userCart.Product.title,
      quantity: userCart.quantity,
      productPrice: userCart.Product.price,
    }));

    res.json(formattedCart);
  } catch (error) {
    console.error("Error fetching user's cart:", error);
    res.status(500).json({ error: error.message });
  }
};
exports.updatecart = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;
  console.log(quantity);
  try {
    const cart = await models.Cart.findOne({
      where: { user: userId, product: productId },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    cart.quantity = quantity;
    await cart.save();

    res.json({ message: "Quantity updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.removefromcart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const result = await models.Cart.destroy({
      where: { user: userId, product: productId },
    });

    if (result === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
