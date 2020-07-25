 var  mongoose =require("mongoose");
   comments=require("./comments");

var camppgroundSchema=new mongoose.Schema({
	name:String,
	image:String,
	description:String,

	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	},
	Comments:[
	{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Comments"
	}
	]
});

module.exports=mongoose.model("campground",camppgroundSchema);