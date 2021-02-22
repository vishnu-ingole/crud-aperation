
var router = require("express").Router();
const product = require('../controller/productController');
const category = require('../controller/categoryController');
const { check, validationResult } = require('express-validator');
const { responseMessage } = require('../response/message')
router.post("/product", product.createProduct);
router.delete("/product", product.deleteProduct);
router.put("/product", product.updateProduct);
router.get("/product", product.getProduct);
//
router.post("/category", category.createCategory);
router.delete("/category", category.deleteCategory);
router.put("/category", category.updateCategory);
router.get("/category", category.getCategory)
module.exports = router;