const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');

// @desc    Add a new category
// @route   POST /api/categories
// @access  Private
const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = new Category({
    user: req.user._id,
    name,
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// @desc    Get logged in user categories
// @route   GET /api/categories
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ user: req.user._id });
  res.json(categories);
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findById(req.params.id);

  if (category && category.user.toString() === req.user._id.toString()) {
    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category && category.user.toString() === req.user._id.toString()) {
    await category.remove();
    res.json({ message: 'Category removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

module.exports = { addCategory, getCategories, updateCategory, deleteCategory };
