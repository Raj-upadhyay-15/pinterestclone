var express = require('express');
var router = express.Router();
const postModel = require("./post")
const userModel = require("./users");
const passport = require('passport');
const localStrategy = require('passport-local')
passport.use(new localStrategy(userModel.authenticate()))
const upload = require('./multer');
const users = require('./users'); 

router.get('/', function(req, res, next) {
  res.render('index',{nav: false});
});
router.get('/register', function(req, res, next) {
  res.render('register',{nav: false});
});
router.get('/profile', isLoggedIn,async function(req, res, next) {
  const user  = 
  await userModel
  .findOne({username: req.session.passport.user})
  .populate("posts")
  // console.log(user);
  res.render("profile",{user, nav: true});
});

router.get('/image/:postId', isLoggedIn, async function(req, res, next) {
  try {
    const postId = req.params.postId;
    const user = await userModel
      .findOne({ username: req.session.passport.user })
      .populate("posts");

    const selectedPost = user.posts.find(post => post._id.toString() === postId);

    if (!selectedPost) {
      return res.status(404).send("Post not found");
    }

    res.render("image", { selectedPost, nav: true });
  } catch (error) {
    next(error);
  }
});

 

router.get('/feed', isLoggedIn,async function(req, res, next) {
const user = await userModel
.findOne({username: req.session.passport.user})
 const posts = await postModel.find()
 .populate("user")
 res.render("feed",{user,posts,nav: true});
});
router.get('/show/posts', isLoggedIn,async function(req, res, next) {
  const user  = 
  await userModel
  .findOne({username: req.session.passport.user})
  .populate("posts")
  // console.log(user);
  res.render("show",{user, nav: true});
});

router.get('/add', isLoggedIn,async function(req, res, next) {
  const user  = await userModel.findOne({username: req.session.passport.user})
  res.render("add",{user, nav: true});
});

router.post('/createpost', isLoggedIn,upload.single("postimage"),async function(req, res, next) {
  const user  = await userModel.findOne({username: req.session.passport.user});
 const post = await postModel.create({
    user:user._id,
    title:req.body.title,
    description: req.body.description,
postimage:req.file.filename,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/show/posts");
});

router.post('/fileupload', isLoggedIn, upload.single("image") ,async function(req, res, next) {
const user  = await userModel.findOne({username: req.session.passport.user})
user.profileimage = req.file.filename;
await user.save();
res.redirect("/profile",);
});

router.post('/login', passport.authenticate("local",{
  failureRedirect:"/",
  successRedirect:"/profile",
}), function(req, res, next) {
  
});
router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err){ return next(err);
    }
    res.redirect('/')
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();

  }
  res.redirect("/")
}
router.post('/register', function(req, res, next) {
  const data = new userModel({
    username:req.body.username,
    email:req.body.email,
    number:req.body.number,
    
  })
  userModel.register(data, req.body.password)
  .then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile")
    })
  })
});

module.exports = router;
