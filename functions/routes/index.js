var express = require("express");
var router = express.Router();

const { firebaseHelper, firestore } = require("./../config/admin.js");

const newsCollection = firestore.collection('news');

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

/*Get by specific id*/
router.get("/:id", function(req, res, next) {
  firebaseHelper.firestore
    .backup(firestore, newsCollection)
    .then(news => {
      console.log('varit')
      let a = newsCollection.where('id','==',id).get()
      if(a.exists){
        successResponse(res,a)
      }else{
        res.status(200).send("KUY");
        notFoundErrorResponse(res,a)
      }
        // snap=>{
        //   if(!snap.empty){
        //     successResponse(res,snap.data());
        //     return snap.data()
        //   }
        //   else{
        //     res.status(200).send("KUY");
        //     notFoundErrorResponse(res, n);
        //     return null
        //   }
        }
      )
    .catch(err => {
      console.log('warat')
      timeOutErrorResponse(res, err);
    });
});

module.exports = router;
