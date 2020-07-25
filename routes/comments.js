var express= require("express");
var router=express.Router({mergeParams:true});
var campground=require("../models/camp");
var Comments=require("../models/comments");
var middleware=require("../middleware");


const { Router } = require("express");
//comments routes

router.get("/camp/:id/comments/new",middleware.isLoggedIn ,function(req,res){
	campground.findById(req.params.id,function(err,campground){
		if (err) {
			console.log(err);
		}else{
	res.render("comments/new",{campground:campground});
		}
		})
})
router.post("/camp/:id/comments",middleware.isLoggedIn,function(req,res){
	campground.findById(req.params.id,function(err,campground){
		if (err) {
			console.log(err);
			res.redirect("/camp");

		}else{
			Comments.create(req.body.comment,function(err,comment){
				if (err) {
					console.log(err);
				}else{
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					campground.Comments.push(comment);
					campground.save();
					console.log(comment);
					res.redirect('/camp/' +campground._id);
				}
			})
		
}
})
})

//comments edit
router.get("/camp/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comments.findById(req.params.comment_id,function(err,foundcomment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit",{campground_id:req.params.id,comment:foundcomment})
		}
	})
})
//comment update

router.put("/camp/:id/comments/:comment_id/",function(req,res){
	Comments.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,Updatedcomment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/camp/"+req.params.id)
		}
	})
})

//comment delete
router.delete("/camp/:id/comments/:comment_id/",middleware.checkCommentOwnership,function(req,res){
	Comments.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","Comment deleted.")
			res.redirect("/camp/"+req.params.id);
		}
	})
})



module.exports=router;