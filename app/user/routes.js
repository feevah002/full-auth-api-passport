const userController = require("./controller");

const router = require("express").Router();

router.post("/auth/signup", userController.register);
router.post("/auth/login", userController.loginMiddleware);
router.post("/auth/logout", userController.logout);
// router.post("/auth/resetPassword", controller.resetPasswordController);

module.exports = router;