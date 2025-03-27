//utils file me 
const multer = require("multer");
const errHendler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      res.json({
        success: 0,
        message: err.message,
      });
    }
  };
  module.exports = errHendler;