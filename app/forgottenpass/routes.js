const controller = require("./controller");

const router = require("express").Router();


router.post("/auth/requestResetPassword", controller.resetPasswordRequestController);
router.post("/auth/resetPassword", controller.resetPasswordController);

module.exports = router;