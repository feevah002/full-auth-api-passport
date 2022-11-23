const passport = require("passport");
const userRepo = require("./repository");
const User = require("./model");

exports.register = async (req, res, next) => {
  
  try{
    const payload = {
      username : req.body.username,
      name:req.body.name,
    }
    let user = await User.register(payload, req.body.password,(err, user)=>{
      if(err){
        console.log(err)
        return res.redirect("/register")
    }
    else{
        passport.authenticate("local")(req,res, function(){
          return res.json(user);
        })
    }
    })
  } catch(err){
    res.status(500).json({
      status:false,
      error:err
    })
  }
  
};

exports.loginMiddleware = passport.authenticate("local",{
  successRedirect:"/",
  failureRedirect:"/login"
}), (req,res)=>{

  
}


exports.logout = async (req, res, next) => {
  req.logout(err=>{
    if(err){
      console.log(err)
    }
  
  })
  return res.json({
    status:true,
    msg:"log out successful"
  });
};

