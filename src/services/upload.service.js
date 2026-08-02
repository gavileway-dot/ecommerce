import cloudinary from "../config/cloudinary.js";

export const uploadBuffer = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: "image" }, (error, result) => {
      if (error) return reject(error);
      resolve({ url: result.secure_url, publicId: result.public_id });
    });

    stream.end(buffer);
  });
};

export const uploadMultipleBuffers = async (files, folder) => {
  return Promise.all(files.map((file) => uploadBuffer(file.buffer, folder)));
};

export const deleteImage = async (publicId) => {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
};