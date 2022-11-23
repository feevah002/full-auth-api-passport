const repository = require("./repository");

exports.resetPasswordRequestController = async (req, res, next) => {
  const requestPasswordResetService = await repository.requestPasswordReset(
    req.body.username
  );
  return res.json(requestPasswordResetService);
};


exports.resetPasswordController = async (req, res, next) => {
  const resetPasswordService = await repository.resetPassword(
    req.body.userId,
    req.body.token,
    req.body.password
  );
  return res.json(resetPasswordService);
};
