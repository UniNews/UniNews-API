var express = require("express");
var router = express.Router();

const { firestore } = require("./../config/admin.js");

const newsCollection = firestore.collection("news");

const {
  notFoundErrorResponse,
  timeOutErrorResponse,
  successResponse
} = require("./../utils/response.js");

/* GET all news. */
router.get("/", function(req, res, next) {
  if(req.method === 'GET'){
      let res_data = {}
      res_data['return_code'] = "200"
      res_data['descrip'] = 'success to get the list of news.'
      res_data['news'] = []
      let getNews = newsCollection.get().then(snap=>{
        snap.forEach(doc => {
          let eachNews = doc.data()
          eachNews['id'] = doc.id
          res_data['news'].push(eachNews)
      })
      successResponse(res,res_data)
      return res_data
      }).catch(err=>{
      console.log('varit'+err)
      notFoundErrorResponse(res,res_data)
      })
  }
  else{
    timeOutErrorResponse(res, "Error reqest")
  }
});

/*Get by specific id*/
router.get("/:id", function(req, res, next) {
  if(req.method==='GET'){
    let id = req.params.id
    var news = newsCollection.doc(id).get().then(snap=>{
        let res_data = {}
        if(!snap.empty){
            res_data['return_code'] = '200'
            res_data['descrip'] = 'Success to query news from id.'
            res_data['news']=snap
        } else {
            res_data['return_code'] = '204'
            res_data['descrip'] = 'ID not founded.'
        }
        successResponse(res,res_data)
        return snap
    }).catch(err=>{
        console.log(err)
        timeOutErrorResponse(res, err)
    })
}
else {
    timeOutErrorResponse(res, "Error reqest")
}
});

module.exports = router;
