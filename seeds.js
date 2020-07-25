var mongoose=require("mongoose");
var campground=require("./models/camp");
var Comments=require("./models/comments");
 var seeds=require("./seeds");
var data=[
		{
			name:"Cloud rest",
			image:"https://images.pexels.com/photos/216675/pexels-photo-216675.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			description:"its on arizona black hill,nice atomsphere"

		},
			{
			name:"Urban valley",
			image:"https://images.pexels.com/photos/1309586/pexels-photo-1309586.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			description:"Near underneath hill,nice atomsphere"

		},
			{
			name:"Orange hill",
			image:"https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			description:"Soil is Orange in color,nice atomsphere"

		},

]


function seedDb(){ 
	campground.deleteMany({},function(err){
		if (err) {
			console.log(err);
		}
		console.log("campground removed");
	})
 }
// data.forEach(function(seed){
// 	campground.create(seed,function(err,campground) {
// 		if (err) {
// 		console.log(err);
// 	}else{
// 		console.log("campground added");


// 		Comments.create(
// 		{
// 			author:"Homer",
// 	        text:"Verry nice !!!"
// 		},function(err,comments){
// 			if (err) {
// 				console.log(err);
// 			}else{
// 				campground.Comments.push(comments);

// 				campground.save();
// 				console.log("comments add");
// 			}
// 	});
// }
// })
//	})

module.exports=seedDb;