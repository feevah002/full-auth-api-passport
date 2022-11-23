const repository = require("./repository");
const bcrypt = require("bcrypt");
const Token = require("./tokenModel");
const User = require("../user/model");
exports.resetPasswordRequestController = async (req, res, next) => {
  const requestPasswordResetService = await repository.requestPasswordReset(
    req.body.username
  );
  return res.json(requestPasswordResetService);
};




exports.resetPasswordController = async (req, res, next) => {
 const func =function(err,changed){
  if(err){console.log(err)}
    changed.save()
    console.log(changed)
  }
  const resetPasswordService = await repository.resetPassword(
    req.body.userId,
    req.body.token,
    req.body.password,
    func
  );
  res.json({
    status:true,
    msg:"password changed susseccfully"
  })

};
