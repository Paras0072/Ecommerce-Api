const { models } = require("../model/index");

// function for fetching all the available categories
exports.fetchCategories = async (req, res) => {
  try {
    const categories = await models.Category.findAll({
      attributes: ["id", "label", "value"],
    });
    console.log(categories)
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
