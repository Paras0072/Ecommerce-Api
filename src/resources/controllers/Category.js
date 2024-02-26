const models = require("../model/index");

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await models.Category.findAll({
      attributes: ["id", "label", "value"],
    });
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
