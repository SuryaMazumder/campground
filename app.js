var express =require("express"),
    app     =express(),
   body     =require("body-parser"),
   mongoose =require("mongoose"),
   campground=require("./models/camp"),
    Comments=require("./models/comments"),
    flash = require("connect-flash"),
   methodoverride=require("method-override"),
  
    campgroundroutes=require("./routes/campground");
    Commentroutes   =require("./routes/comments");
    indexroutes     =require("./routes/index");
   passport=require("passport"),
    LocalStrategy=require("passport-local"),
    User=require("./models/user"),
    passportLocalMongoose = require('passport-local-mongoose');
    seedDb=require("./seeds");
                                  


mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true } );


app.use(express.static(__dirname + '/public'));


// campground.create({
// 	name:"Suitrel",
// 	image:"https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
// 	description:"Its a nice and beautiful campground "
	
// },function(err,campground){
// 	if(err){
// 		console.log(err);
// 	} else{
// 		console.log("new Campground created:");
// 		console.log(campground);
// 		comments.create({
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
// 		})
// 	}
// });
app.use(methodoverride("_method"));

app.use(body.urlencoded({extended: true}));
app.set("view engine","ejs");

//seedDb();




app.use(require("express-session")({
	secret:"surya is warrior",
	resave:false,
	saveUninitialized:false
}));
//use flash
app.use(flash());

app.use(function(req,res,next){
  app.locals.currentUser=req.user;
  app.locals.error=req.flash("error");
  app.locals.success=req.flash("success");
	next();
});
//passport configuration

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.user = req.user || null
  next();
})
app.use(indexroutes);
app.use(Commentroutes);
app.use(campgroundroutes);

app.listen(8010,function(){
	console.log("yelpcamp server running");
});