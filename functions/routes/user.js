var express = require('express')
var router = express.Router()

const {  cors ,firebaseDB,admin  } = require('./../config/admin.js')

var database = firebaseDB
var usersRef = database.ref('user');
var newsRef =database.ref('news')

const {
  notFoundErrorResponse,
  timeOutErrorResponse,
  successResponse
} = require('./../utils/response.js')
router.post('/profile',function (req, res, next) {
  cors(req, res, () => {
      let user_token = req.body.user_token
      let displayName = req.body.displayName
      let aboutMe = req.body.aboutMe
      let img=req.body.img
      data = {}
      admin.auth()
      .verifyIdToken(user_token)
      .then(function (decodedToken) {
      usersRef.child(decodedToken.uid).on("value", function (snap)
      {
        data['permission']=snap.val().permission
        data['displayName'] = displayName
        data['img']=img
        data['aboutMe']=aboutMe
        data['user_id']=snap.val().user_id
        usersRef.child(decodedToken.uid).set(data)
       successResponse(res, 'Update profile successfully', data)
     })
    })
  })
})
router.get('/:id',function (req, res, next) {
    cors(req, res, () => {
        let id = req.params.id
        data = {}
        var catalogs = ['Restaurants', 'Accommodation', 'Official News', 'Social', 'Learning', 'Love']
        usersRef.child(id).on("value", function (snap)
        {
         data=snap.val()
         data['like_news']=[]
         data['post_news']=[]
         data['follower']=[]
         data['following']=[]
         if(snap.val().like_news!==null){
           catalogs.forEach(e=>{
           snap.val().like_news.forEach(element => {
             newsRef.child(e).child(element).on('value',function(sd){
                xd={}
                xd['title']=sd.val().title
                xd['imgs']=sd.val().imgs
                xd['news_id']=snap.key
                xd['author']=snap.val().user_id
                data['like_news'].push(xd)
             })
           });
            } )
         }
         if(snap.val().post_news!==null){
          catalogs.forEach(e=>{
          snap.val().post_news.forEach(element => {
            newsRef.child(e).child(element).on('value',function(sd){
              xd={}
              xd['title']=sd.val().title
              xd['imgs']=sd.val().imgs
              xd['news_id']=snap.key
              xd['author']=snap.val().user_id
              data['post_news'].push(xd)
            })
            
          });
           } )
        }
        if(snap.val().follower!==null){
          snap.val().follower.forEach(element=>{
            usersRef.child(element).on('value',function(sd){
              xd={}
              xd['user_id']=sd.val().user_id
              xd['img']=sd.val().img
              xd['displayName']=sd.val().displayName
              xd['aboutMe']=sd.val().aboutMe
              data['follower'].push(xd)
            })
          })
        }
        if(snap.val().following!==null){
          snap.val().following.forEach(element=>{
            usersRef.child(element).on('value',function(sd){
              xd={}
              xd['user_id']=sd.val().user_id
              xd['img']=sd.val().img
              xd['displayName']=sd.val().displayName
              xd['aboutMe']=sd.val().aboutMe
              data['following'].push(xd)
            })
          })
        }

         successResponse(res, 'Get all news successfully.', data)
       })
        
    })
  })
router.post('/following',function(req, res, next){
  cors(req, res, () => {
      let user_token=req.body.user_token
      let user_id=req.body.user_id
      var data ={}
      admin.auth()
      .verifyIdToken(user_token)
      .then(function (decodedToken) {
        usersRef.child(decodedToken.uid).on("value", function (snap)
        {
          usersRef.child(user_id).on("value", function (sd){
          if (snap.val()==null || sd.val() == null) {
            console.log(snap.val())
            console.log(sd.val())
            console.log("No such document!")
         }
         else if(snap.val().following == null&&sd.val().follower == null)
         {
         usersRef.child(decodedToken.uid).child('following').child(0).set(user_id)
         usersRef.child(user_id).child('follower').child(0).set(decodedToken.uid)
         data['following']=decodedToken.uid
         data['follower']=user_id
         successResponse(res, 'Get all news successfully.', data)
         }else if(snap.val().following == null){
          usersRef.child(decodedToken.uid).child('following').child(0).set(user_id)
          usersRef.child(user_id).child('follower').child(snap.val().following.length).set(decodedToken.uid)
          data['following']=decodedToken.uid
          data['follower']=user_id
          successResponse(res, 'Get all news successfully.', data)
         }else if(sd.val().follower==null){
          usersRef.child(decodedToken.uid).child('following').child(snap.val().following.length).set(user_id)
          usersRef.child(user_id).child('follower').child(0).set(decodedToken.uid)
          data['following']=decodedToken.uid
          data['follower']=user_id
          successResponse(res, 'Get all news successfully.', data)
         }
         else{
          usersRef.child(decodedToken.uid).child('following').child(snap.val().following.length).set(user_id)
          usersRef.child(user_id).child('follower').child(snap.val().following.length).set(decodedToken.uid)
         data['Following']=decodedToken.uid
         data['Follower']=user_id
         successResponse(res, 'Get all news successfully.', data)
         }
        })
       })
      })
  })
})

module.exports = router