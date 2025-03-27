
const express = require("express");
const router = require("./routes/index.js");
const app = express();
const path = require("path");

const errHandler=require('./utils/errorHandler.js')

app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use("/v1/profile", express.static(path.join(process.cwd(), "/public/upload/images")));
app.use(errHandler);
module.exports = app;


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     }
//   });
  
//   const upload = multer({ 
//     storage: storage 
// });
// module.exports =upload;
  
  
// // storage image 
// const storage = multer.diskStorage({
//     destination: "./public/upload/images",
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// })
// const Upload= multer({
//     // dest: "./upload/images",
//      storage: storage,
//     //  limits: { fileSize: 100 },
// })

// app.use("/profile", express.static("./public/upload/images"));
// app.post("/upload", Upload.single("profile"),
// (req, res) => {
//     console.log(req.file);
//     res.json({
//         success: 1,
//         profile_url: `http://localhost:8080/profile/${req.file.filename}`
//     })
// });

// //function is create for uplode image limited file size 
// function errHendler(err, req, res , next) {
//     if(err instanceof multer.MulterError){
//         res.json({
//             success: 0,
//             message: err.message
//         })
//     }
//     }
//     app.use(errHendler);

// // app.listen(8080, () => {
// //     console.log("server up and running");
// // })
// module.exports=app;
