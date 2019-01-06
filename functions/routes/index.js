var express = require("express");
var router = express.Router();

const {  firestore } = require("./../config/admin.js");

const newsCollection = firestore.collection("news");

const {
  notFoundErrorResponse,
  timeOutErrorResponse,
  successResponse
} = require("./../utils/response.js");

/* GET all news. */
router.get("/", function(req, res, next) {

});

/*Get by specific id*/
router.get("/:id", function(req, res, next) {
 
});

module.exports = router;
