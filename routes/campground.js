var express= require("express");
var router=express.Router();
var campground=require("../models/camp");
var middleware=require("../middleware");
router.get('/camp',function(req,res){
	// console.log(req.user);

	campground.find({},function(err,allCamp){
		if(err){
			console.log(err);
		}else{
				res.render("camp",{campground:allCamp});
		}	
		});
	
});

router.post('/camp',middleware.isLoggedIn,function(req,res){
		var name=req.body.name;
		
		var image=req.body.image;
		var desc=req.body.description;
		var author={
			id:req.user._id,
			username:req.user.username
		}

		var newcamp={name:name,image:image,description:desc,author:author};
		campground.create(newcamp,function(err,newlycreated) {
			// body...
			if(err){
				console.log(err);
			}else{
				res.redirect('/camp');
				console.log(newlycreated);
			}

		})
		

    })


    router.get('/camp/new',middleware.isLoggedIn,function(req,res){
        res.render("new");
    })
    router.get('/camp/:id',function(req, res) {
        campground.findById(req.params.id).populate("Comments").exec(function(err,foundcamp){
            if(err){
                console.log(err);
                
            }else{
                    res.render('show',{campground:foundcamp});
    
            }
        });
       
	})
//Edit 
router.get("/camp/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	campground.findById(req.params.id,function(err,foundcamp){
		res.render("edit",{campground:foundcamp});

		})


})

//Update
router.put('/camp/:id/',middleware.checkCampgroundOwnership,function(req,res){
	campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcamp){
		if(err){
			res.redirect('/camp');

		}else{
			res.redirect('/camp/' +req.params.id);
		}
	})
})
//delete
router.delete('/camp/:id',middleware.checkCampgroundOwnership,function(req,res){
	campground.findByIdAndDelete(req.params.id,function(err){
		if(err){
			res.redirect('/camp');
		}else{
			res.redirect('/camp');
		}
	})
})


	


	

	module.exports=router;