var express = require("express");
var router = express.Router();

const { firebaseHelper, firestore } = require("./../config/admin.js");

const newsCollection = "news";

const {
  notFoundErrorResponse,
  timeOutErrorResponse,
  successResponse
} = require("./../utils/response.js");

/* GET all news. */
router.get("/", function(req, res, next) {
  firebaseHelper.firestore
    .backup(firestore, newsCollection)
    .then(news => {
      // res.status(200).send("KUY");
      if (news.exists) {
        successResponse(res, news);
      } else {
        notFoundErrorResponse(res, news);
      }
    })
    .catch(err => {
      timeOutErrorResponse(res, err);
    });
});

module.exports = router;
