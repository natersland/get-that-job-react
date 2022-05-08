import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

/*error*/ const cloudinaryUpload = async (files) => {
  const fileUrl = [];
  for (let file of files.logo) 
  {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "register/uploadFile",
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
export { cloudinaryUpload };
