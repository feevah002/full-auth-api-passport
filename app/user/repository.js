const User = require("./model");


exports.register = async (payload, pass, func)=>{
  let userInfo = await new User(payload)
  
  let regUser = await User.register(payload, pass,func)
  return regUser
}



exports.findOne = async (data)=>{
  let user = await User.findOne(data);
  return user;
}

