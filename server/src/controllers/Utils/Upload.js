import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import {storage} from './Firebase.js';
import sharp from sharp;

export async function uploadImage(file) {
  let fileBuffer = await sharp(file.buffer)
  .resize({with: 300, height: 300, fit: "cover"})
  .toBuffer();

  const fileRef = ref(storage, `files/${file.originalname} ${Date.now()}`);
  
  const fileMetaData = {
    contentType: file.mimetype
  }

  const fileUploadPromise = uploadBytesResumable(fileRef, fileBuffer, fileMetaData);

  await fileUploadPromise();

  const fileDownloadUrl = await getDownloadURL(fileRef);

  return {ref: fileRef, downloadURL: fileDownloadUrl}
}