const express=require('express');
const userController =require("../controllers/user-controller");
const checkauth = require("../middlewares/check-auth");

const router= express.Router();

router.post("/signup", userController.userSignup);
router.post("/login",userController.userLogin);

router.get("/getblog",userController.getBlog);
router.use(checkauth);
router.get("/getUser/:firstname/:lastname", userController.userInfo);
// router.post("/createblog",userController.postBlog);


module.exports =router;