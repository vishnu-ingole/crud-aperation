

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require('../models/index');
const Category = db.category;
const { body, validationResult } = require('express-validator/check');
const { responseMessage } = require('../response/message')

// add data in database
exports.createCategory = async (req, res) => {
         // validation
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
                  res.status(422).json({ errors: errors.array()[0].msg });
                  return;
         }
         const { categoryName } = req.body;

         // create object of Course
         const data = {
                  categoryName: categoryName
         };


         // Save in the databasse

         Category.create(data)
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
exports.deleteCategory = async (req, res) => {
         const { id } = req.query;

         try {
                  const deleted = await Category.destroy({
                           where: { categoryId: id }
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
exports.updateCategory = async (req, res) => {
         const { categoryName, categoryId } = req.body;
         const data = {
                  categoryName: categoryName
         }
         try {
                  const [updated] = await Category.update(data, {
                           where: { categoryId: categoryId }
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
exports.getCategory = async (req, res) => {

         try {
                  const Result = await Category.findAll()
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
                  return res.status(500).json({ error: error.message })
         }



}



