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
      data = ''
      admin.auth()
      .verifyIdToken(user_token)
      .then(function (decodedToken) {
        data='change profile'
        usersRef.child(decodedToken.uid).update({
          'displayName': displayName,
          'img':img,
          'aboutMe':aboutMe
        });
       successResponse(res, 'Update profile successfully', data)
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
          console.log('1111111')
          console.log(id)
          console.log(snap.val())
         data=snap.val()
         if(snap.val().like_news !== undefined){
          console.log('2222222')
          console.log(snap.val().like_news)
          data['like_detail']=[]
           catalogs.forEach(e=>{
           snap.val().like_news.forEach(element => {
             newsRef.child(e).child(element).on('value',function(sd){
              console.log('33333333')
              if(sd.val()!==null){
              console.log(sd.val())
                xd={}
                xd['title']=sd.val().title
                xd['imgs']=sd.val().imgs
                xd['news_id']=sd.key
                if(snap.val().user_id!== undefined){
                usersRef.child(sd.val().user_id).on('value',(snack)=>{
                  xd['author']=snack.val().displayName
                })
                data['like_detail'].push(xd)
              }
              }
             })
           });
            } )
         }
         if(snap.val().post_news !== undefined){
          data['post_detail']=[]
          catalogs.forEach(e=>{
          snap.val().post_news.forEach(element => {
            
            newsRef.child(e).child(element).on('value',function(sd){
              console.log('44444444')
              if(sd.val()!==null){
              console.log(sd.val())
              xd={}
              xd['title']=sd.val().title
              xd['imgs']=sd.val().imgs
              xd['news_id']=sd.key
              if(snap.val().user_id!== undefined){
              usersRef.child(snap.val().user_id).on('value',(snack)=>{
                xd['author']=snack.val().displayName
              })
              data['post_detail'].push(xd)
              }
              }
            })
          });
           } )
        }
        if(snap.val().follower!== undefined){
          data['follower_detail']=[]
          snap.val().follower.forEach(element=>{
            usersRef.child(element).on('value',function(sd){
              xd={}
              xd['user_id']=sd.val().user_id
              xd['img']=sd.val().img
              xd['displayName']=sd.val().displayName
              xd['aboutMe']=sd.val().aboutMe
              data['follower_detail'].push(xd)
            })
          })
        }
        if(snap.val().following!== undefined){
          data['following_detail']=[]
          snap.val().following.forEach(element=>{
            usersRef.child(element).on('value',function(sd){
              xd={}
              xd['user_id']=sd.val().user_id
              xd['img']=sd.val().img
              xd['displayName']=sd.val().displayName
              xd['aboutMe']=sd.val().aboutMe
              data['following_detail'].push(xd)
            })
          })
        }
        console.log('55555555')
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
        usersRef.child(decodedToken.uid).once("value", function (snap)
        {
          usersRef.child(user_id).once("value", function (sd){
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
         console.log('dsdsdsdsdsdsdsdsd')
         console.log(user_id)
         successResponse(res, 'Get all news successfully.', data)
         }else if(snap.val().following == null){
          usersRef.child(decodedToken.uid).child('following').child(0).set(user_id)
          usersRef.child(user_id).child('follower').child(sd.val().follower.length).set(decodedToken.uid)
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
           if(snap.val().following.includes(user_id)&&sd.val().follower.includes(decodedToken.uid)){
            data['Following']=decodedToken.uid
            data['Follower']=user_id
            usersRef.child(decodedToken.uid).child('following').set(snap.val().following.filter(e=>e!=user_id))
            usersRef.child(user_id).child('follower').set(sd.val().follower.filter(e=>e!=decodedToken.uid))
            successResponse(res, 'unfollow', data)
           }else{
          usersRef.child(decodedToken.uid).child('following').child(snap.val().following.length).set(user_id)
          usersRef.child(user_id).child('follower').child(sd.val().follower.length).set(decodedToken.uid)
         data['Following']=decodedToken.uid
         data['Follower']=user_id
         successResponse(res, 'Get all news successfully.', data)
           }
         }
        })
       })
      })
  })
})

module.exports = router