var express= require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");
router.get('/',function(req,res){
	res.render("home");

});


//show register form
router.get("/register",function (req,res) {
	res.render("register");
})

//get register data

router.post("/register",function(req,res){
	var Newuser=new User({username:req.body.username});
	User.register(Newuser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			console.log(err);
			return res.redirect("register");
		}
		passport.authenticate('local')(req,res,function(){
			req.flash("success","Welcome to Yelpcamp" +user.username);
			res.redirect("/camp");
		});

		
	})
})

//show login form
router.get("/login",function (req,res) {
	res.render("login");
})
//get login data
//app.post("/login",middleware,callback)
router.post("/login",passport.authenticate('local',{
			successRedirect:"/camp",
			failureRedirect:"/login"
}),function(req,res){
});
//logout
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","You logged out");
	res.redirect("/");
})

//isLoggedIn
function isLoggedIn(req,res,next) {
	if(req.isAuthenticated()){
		return next();
	}
	
	res.redirect("/login");
}
module.exports=router;