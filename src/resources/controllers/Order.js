const { models } = require("../model/index");

// function for placing the order from cart
exports.placeOrder = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find user's cart
    const userCart = await models.Cart.findAll({
      where: { user: userId },
      include: [
        {
          model: models.Product,
          attributes: ["id", "title", "price"],
        },
      ],
    });

    // Check if the cart is not empty
    if (userCart.length === 0) {
      return res.status(404).json({ error: "Cart is empty or not found" });
    }

    // Calculate total amount and total items
    let totalAmount = 0;
    let totalItems = 0;

    // Map cart items to order items and calculate totals
    const orderItems = userCart.map((cartItem) => {
      const product = cartItem.Product;
      const quantity = cartItem.quantity;
      const subtotal = product.price * quantity;

      totalAmount += subtotal;
      totalItems += quantity;

      return {
        productId: product.id,
        productName: product.title,
        quantity: quantity,
        productPrice: product.price,
        subtotal: subtotal,
      };
    });

    // Create the order
    const order = await models.Order.create({
      user: userId,
      items: orderItems,
      totalAmount: totalAmount,
      totalItems: totalItems,
    });

    // Remove items from the cart (optional)
    await models.Cart.destroy({
      where: { user: userId },
    });

    return res.status(200).json({
      message: "Order placed successfully",
      order: {
        id: order.id,
        userId: order.user,
        items: order.items,
        totalAmount: order.totalAmount,
        totalItems: order.totalItems,
      },
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  // try {
  //   // const user = await User.findByPk(userId, {
  //   //   include: {
  //   //     model: Product,
  //   //     through: { attributes: ["quantity"] },
  //   //   },
  //   // });

  //   // if (!user) {
  //   //   return res.status(404).json({ error: "User not found" });
  //   // }
  //   const user = await models.Cart.sum("quantity", {
  //     where: {
  //       user: userId,
  //     },
  //   });
  //   const order = await models.Order.create();

  //   // Associate products from the cart with the order
  //   await Promise.all(
  //     user.Products.map(async (product) => {
  //       await models.Cart.destroy({
  //         where: { user: userId, product: product.id },
  //       });

  //       await order.addProduct(product, {
  //         through: { quantity: product.Cart.quantity },
  //       });
  //     })
  //   );

  //   res.json({ message: "Order placed successfully" });
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};

// function for finding the oerder history of user
exports.orderHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const orderHistory = await models.Order.findAll({
      where: {
        user: userId,
      },
    });
    res.json(orderHistory);
   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// function for finding the order details
exports.orderDetails = async (req, res) => {
  const { orderId } = req.params;

  try {
     const order = await models.Order.findByPk(orderId);
     if (!order) {
       return res.status(404).json({ error: "Order not found" });
     }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
