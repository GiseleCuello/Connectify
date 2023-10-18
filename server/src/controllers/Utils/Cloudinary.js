const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dl998a8n8',
  api_key: '585639896658488',
  api_secret: 'xt87QhxrtYO2J6TpxpnQCJUuKks',
  secure: true,
});

const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'Connectify',
  });
};

module.exports = uploadImage;
