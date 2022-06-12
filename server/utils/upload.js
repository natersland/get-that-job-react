import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
const cloudinaryUploadCV = async (files) => {
  const fileUrl = [];
  if (files.cvFile !== undefined) {
    for (let file of files.cvFile) {
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
  } else {
    fileUrl.push({
      url: null,
      publicId: null,
    });
    return fileUrl;
  }
};

const cloudinaryUploadLogo = async (files) => {
  const logoUrl = [];
  if (files.logoFile !== undefined) {
    for (let file of files.logoFile) {
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
  } else {
    logoUrl.push({
      url: "https://res.cloudinary.com/gtjadmin/image/upload/v1652809230/register/logoFile/placeholder-company_j67t9a.jpg",
      publicId: null,
    });
    return logoUrl;
  }
};

const cloudinaryUpdateCV = async (files) => {
  const fileUrl = [];
  for (let file of files.cvFiles) {
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

const cloudinaryUpdateLogo = async (files) => {
  const logoUrl = [];

  for (let file of files.companyLogo) {
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

export {
  cloudinaryUploadCV,
  cloudinaryUploadLogo,
  cloudinaryUpdateLogo,
  cloudinaryUpdateCV,
};
