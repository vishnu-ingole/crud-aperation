

const sequelize = require("sequelize");
const Op = sequelize.Op;
const db = require('../models/index');
const Product = db.product;
const Category = db.category;
const { body, validationResult } = require('express-validator/check');
const { responseMessage } = require('../response/message')
Product.belongsTo(Category, { foreignKey: 'categoryId' })
// add data in database
exports.createProduct = async (req, res) => {
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array()[0].msg });
    return;
  }
  const { productName, categoryId } = req.body;

  // create object
  const data = {
    productName: productName,
    categoryId: parseInt(categoryId)
  };
  // Save in the databasse

  Product.create(data)
    .then(data => {
      res.json({
        message: responseMessage.success.dataAdded,
        result: data
      })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

// delete data in database
exports.deleteProduct = async (req, res) => {
  const { id } = req.query;

  try {
    const deleted = await Product.destroy({
      where: { productId: id }
    });
    if (deleted) {
      return res.json({
        message: responseMessage.success.dataDeleted
      })
    }
  } catch (error) {
    return res.status(500).send({
      message: responseMessage.error.dataNotDeleted
    });
  }

}

// update data in databass
exports.updateProduct = async (req, res) => {
  const { productName, productId, categoryId } = req.body;
  const data = {
    productName: productName,
    categoryId: categoryId,
  }
  try {
    const [updated] = await Product.update(data, {
      where: { productId: productId }
    });

    if (updated) {
      return res.status(200).json({
        message: responseMessage.success.dataUpdated
      });
    }

  } catch (error) {
    return res.status(500).send({
      message: responseMessage.error.dataNotUpdated
    });
  }

}

// get data by student
exports.getProduct = async (req, res) => {
  var { page } = req.query;
  var page = page !== undefined ? page : 1;
  let limit = 10
  let offset = (page - 1) * limit;

  try {
    const Result = await Product.findAll({

      attributes: [
        'productId',
        'productName',
        [sequelize.literal("`category`.categoryName"), 'categoryName'],
        [sequelize.literal("`category`.categoryId"), 'categoryId']

      ],
      include: [{
        attributes: [],
        model: Category,
        required: true
      }],

      offset: offset,
      limit: limit,

    }
    )
    if (Result) {
      res.json({
        data: Result,
      })
    } else {
      res.json({
        message: responseMessage.error.dataNotFetch
      })
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: error.message })
  }



}



