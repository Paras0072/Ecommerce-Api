const {models} = require("../model/index");

exports.placeOrder = async (req, res) => {
  const { userId } = req.params;

  try {
    // const user = await User.findByPk(userId, {
    //   include: {
    //     model: Product,
    //     through: { attributes: ["quantity"] },
    //   },
    // });

    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    const user = await models.Cart.sum("quantity", {
      where: {
        user: userId,
      },
    });
    const order = await models.Order.create();

    // Associate products from the cart with the order
    await Promise.all(
      user.Products.map(async (product) => {
        await models.Cart.destroy({
          where: { user: userId, product: product.id },
        });

        await order.addProduct(product, {
          through: { quantity: product.Cart.quantity },
        });
      })
    );

    res.json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.orderHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    //  const user = await User.findByPk(userId, {
    //    include: {
    //      model: Order,
    //      include: { model: Product, through: { attributes: ["quantity"] } },
    //    },
    //  });

    const orderHistory = await models.Order.findAll({
      where: {
        user: userId,
      },
    });
    //  if (!user) {
    //    return res.status(404).json({ error: "User not found" });
    //  }
    res.json(orderHistory);
    // res.json(user.Orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.orderDetails = async (req, res) => {
  const { orderId } = req.params;

  try {
    //  const order = await Order.findByPk(orderId, {
    //    include: { model: Product, through: { attributes: ["quantity"] } },
    //  });

    //  if (!order) {
    //    return res.status(404).json({ error: "Order not found" });
    //  }
    const order = await models.Order.findByPk(orderId);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
