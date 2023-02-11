const streamifier = require("streamifier");
const { cloudinary } = require("../config/cloudinary");

// @desc   Upload Image [ProductEditPage.js]
// @route  POST /upload
// @access Public
const handleUpload = async (req, res) => {
  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  // Check if file uploaded
  if (!req.file) {
    throw new Error("No File Uploaded");
  }

  const productImage = req.file;

  // Check file type
  if (!productImage.mimetype.startsWith("image")) {
    throw new Error("Please Upload Image");
  }

  const maxSize = 1024 * 1024;

  // Check image size
  if (productImage.size > maxSize) {
    throw new Error("Please upload image smaller 1MB");
  }

  const result = await streamUpload(req);
  res.json(result);
};

module.exports = { handleUpload };
