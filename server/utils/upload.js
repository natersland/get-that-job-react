import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
const cloudinaryUploadCV = async (files) => {
  const fileUrl = [];
  for await (let file of files.cvFile) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "register/cvFile",
      type: "private",
    });
    fileUrl.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
    await fs.unlink(file.path);
  }

  return fileUrl;
};

const cloudinaryUploadLogo = async (files) => {
  const logoUrl = [];
  for await (let file of files.logoFile) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "register/logoFile",
      type: "private",
    });
    logoUrl.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
    await fs.unlink(file.path);
  }

  return logoUrl;
};

export { cloudinaryUploadCV, cloudinaryUploadLogo };
