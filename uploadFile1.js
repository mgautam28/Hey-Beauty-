const multer = require("multer");
const path = require("path");
const MAX_FILE_SIZE = 100 * 1024 * 1024; //100MB

const Upload1 = multer({
storage: multer.diskStorage({
    destination: path.join(process.cwd(), "/public/upload/images"),
    filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
  limits: {
    fileSize: MAX_FILE_SIZE, // Max file size (100MB)
    files: 2, // Maximum number of files per request
    //fieldNameSize: 100, // Maximum field name size in bytes
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
// var multipleUpload=Upload1.array("file", 2)

module.exports = Upload1;
// module.exports=storage;