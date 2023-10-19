const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const cloudName = process.env.CLOUDINARY_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'Connectify',
  });
};

module.exports = uploadImage;
