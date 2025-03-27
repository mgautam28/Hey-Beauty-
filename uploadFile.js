const multer = require("multer");
const path = require("path");
const fs = require("fs");
const MAX_FILE_SIZE = 100 * 1024 * 1024; //100MB
// const curr_timestamp = Date.now();
// const now = new Date();
// const curr_timestamp= `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
// console.log(curr_timestamp); // Example: 2025-01-14_12-34-56



const UploadFiles = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // const curr_timestamp = Date.now()
      const now = new Date();
      const curr_timestamp= `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
      console.log(curr_timestamp); // Example: 2025-01-14_12-34-56
      // var dest_path = path.join(process.cwd(), `/public/upload/${curr_timestamp}`);
      if (file.fieldname === "poseFile") {
        // var dest_path1 = path.join(dest_path, 'poseFile')
        var dest_path1 = path.join(process.cwd(), `/public/upload/${curr_timestamp}/poseFile/`);
      } else if (file.fieldname === "clothFile") {
        // var dest_path1 = path.join(dest_path, 'clothFile')
        var dest_path1 = path.join(process.cwd(), `/public/upload/${curr_timestamp}/clothFile/`);
      } else {
        var dest_path1 = path.join(process.cwd(), `/public/upload/images/`);
      }
      fs.mkdirSync(dest_path1, { recursive: true });
      cb(null, dest_path1);
    },
    filename: (req, file, cb) => {
      const now = new Date();
      const curr_timestamp1= `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
      // const curr_timestamp1 = Date.now();
      cb(null, `${file.fieldname}_${curr_timestamp1 }${path.extname(file.originalname)}`);
    },
  }),
  limits: {
    fileSize: MAX_FILE_SIZE, // Max file size (100MB)
    files: 3, // Maximum number of files per request
    // fieldNameSize: 100, // Maximum field name size in bytes
    //fieldSize: 2 * 1024 * 1024, // Maximum size of a single field (2MB)
  },
  fileFilter: (req, file, cb) => {
    // Allow only specific file types
    const allowedFileTypes = /jpeg|jpg|png|gif/; // Allowed extensions
    const mimeType = allowedFileTypes.test(file.mimetype); // Check MIME type
    const extName = allowedFileTypes.test(path.extname(file.originalname).toLowerCase()); // Check extension
    if (mimeType && extName) {
      return cb(null, true); // Accept file
    }
    cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
  },
});
module.exports = UploadFiles;