// controller file me


const imageUpload = (req, res) => {
    console.log("reqquuu==>",req.file);
    res.json({
      status: true,
      profile_url: `http://localhost:8080/v1/profile/${req.file.filename}`,
    });
  };

const multiUpload = (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "No files uploaded." });
  }
  const fileList = [
    {
      poseFile: req.files.poseFile ? req.files.poseFile[0].path : "N/A",
      clothFile: req.files.clothFile ? req.files.clothFile[0].path : "N/A",
      file: req.files.file ? req.files.file[0].path : "N/A",
    },
  ];
  res.status(200).json({ status: true, message: "Files uploaded successfully!", files: fileList });
};
  module.exports = {
    imageUpload,
    multiUpload,
  };