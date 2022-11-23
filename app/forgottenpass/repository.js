const User = require("../user/model");
const Token = require("./tokenModel");
const sendEmail = require("../../utils/email/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const bcryptSalt = process.env.BCRYPT_SALT



const clientURL = process.env.CLIENT_URL;

exports.requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  console.log(user)
  if (!user) throw new Error("Email does not exist");

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}/resetPassword?token=${resetToken}&id=${user._id}`;

  sendEmail(
    user.username,
    "Password Reset Request",
    {
      name: user.name,
      link: link,
    },
    "../../utils/email/template/requestResetPassword.handlebars"
  );
  return link;
};


exports.resetPassword = async (userId, token, password,func) => {

  let passwordResetToken = await Token.findOne({ userId: userId });

  if (!passwordResetToken) {
    res.json("Invalid or expired password reset token");
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  const user = await User.findByIdAndUpdate({ _id: userId });
  const updatedUser = await user.setPassword(password,func)
  await passwordResetToken.deleteOne();
  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  ); 
};

