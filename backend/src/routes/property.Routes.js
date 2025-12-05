const express = require("express");
const {
  createOwner,
  createProperty,
  uploadImage,
  getAllProperties,
  updateProperty,
  getSigleUserProperty,
  removeOwner,
  getFilteredProperties,
  getAllUsers,
} = require("../controllers/propertycontroller");
const router = express.Router();
const { IsUserLoggedIn } = require("../middleware/IsUserLogedIn");

router.use(IsUserLoggedIn);
router.route("/createowner").post(createOwner);
router.route("/removeowner").get(removeOwner);
router.route("/createproperty").post(createProperty);
router.route("/uploadassets").get(uploadImage);
router.route("/getallproperties").get(getAllProperties);
router.route("/updateproperty/:id").post(updateProperty);
router
  .route("/getsingleuserallproperties")
  .get(IsUserLoggedIn, getSigleUserProperty);
router.route("/getfilteredproperties").post(getFilteredProperties);

// admin
router.route("/getallusers").get(getAllUsers);

module.exports = router;
