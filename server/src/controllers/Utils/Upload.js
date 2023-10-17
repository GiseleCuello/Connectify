const {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require('firebase/storage');
const { storage } = require('./Firebase');

const uploadImage = async (file) => {
  try {
    const fileRef = ref(storage, `files/${file.originalname} ${Date.now()}`);
    const fileMetaData = {
      contentType: file.mimetype,
    };

    const filePromise = uploadBytesResumable(
      fileRef,
      file.buffer, // No se necesita procesamiento con sharp
      fileMetaData
    );

    await filePromise;

    const fileDownloadUrl = await getDownloadURL(fileRef);

    return { ref: fileRef, downloadURL: fileDownloadUrl };
  } catch (error) {
    console.error('Error en la función uploadImage:', error);
    throw error;
  }
};

module.exports = uploadImage;
