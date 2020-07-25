var middleware={};
var campground=require("../models/camp");
var Comments=require("../models/comments");

middleware.checkCampgroundOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        campground.findById(req.params.id,function(err,foundcamp){

            if(err){
				req.flash("error","Campground not found");

                res.redirect("back");
            }else{
                if(foundcamp.author.id.equals(req.user._id)){
                    next();
                }else{
					req.flash("error","You don't have permission to do that");
                    res.redirect("back");

                }
            }
        })
    }else{
		req.flash("error","You have to be logged in ");
            res.redirect("back");
    }
}


middleware.checkCommentOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		Comments.findById(req.params.comment_id,function(err,foundcomment){

			if(err){
				res.redirect("back");
			}else{
				if(foundcomment.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");

				}
			}
		})
	}else{
			res.redirect("back");
	}
}

middleware.isLoggedIn=function(req,res,next) {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","please login first");
	res.redirect("/login");
}

module.exports=middleware;