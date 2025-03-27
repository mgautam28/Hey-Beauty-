const router = require("express").Router();
// const heyBeauty_controller = require ("../../controllers/heyBeauty/heyBeauty_controller")
const {heyBeauty_controller ,imageUpload_controller }= require("../../controllers/index");
const UploadFiles = require("../../Middlewares/uploadFile")
const Upload = require("../../Middlewares/uploadFile1")



router.post("/upload",Upload.single("profile"), imageUpload_controller.imageUpload);
// router.post("/upload",Upload1.single(["image","cloth"],1), imageUpload_controller.imageUpload);


// var multipleUpload=Upload1.fields([{name: "files ", maxCount: 2 }])

router.post("/createJob", heyBeauty_controller.createJob);
router.put("/upload/img",Upload.single( "file"), heyBeauty_controller.uploadLink);
router.put("/upload/cloth", Upload.single("file"),heyBeauty_controller.uploadLink);
router.post("/submitJob", heyBeauty_controller.submitJob);
router.post("/checkStatus", heyBeauty_controller.checkStatus);


 router.post("/uploads",UploadFiles.fields([
    { name: "poseFile", maxCount: 1 },
    { name: "clothFile", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  imageUpload_controller.multiUpload
); 
router.post("/uploa",UploadFiles.fields([
  { name: "poseFile", maxCount: 1 },
  { name: "clothFile", maxCount: 1 },
  { name: "file", maxCount: 1 },
]),heyBeauty_controller.tryOn);


module.exports = {
  heyBeauty_routes: router,
};