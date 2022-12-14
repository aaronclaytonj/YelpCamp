const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const campgrounds = require("../controllers/campgrounds");
const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../middleware.js");

router.get("/", catchAsync(campgrounds.index));
router.get("/new", isLoggedIn, campgrounds.renderCampgroundForm);
router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(campgrounds.createNewCampground)
);
router.get("/:id", catchAsync(campgrounds.showCampground));
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);
router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(campgrounds.editCampground)
);
router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.deleteCampground)
);

module.exports = router;
