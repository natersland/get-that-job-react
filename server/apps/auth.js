import {Router} from "express"
import {db} from "../utils/db.js"
import bcrypt from "bcrypt"
import multer from "multer";
import { cloudinaryUpload } from "../utils/uploads.js";

const authRouter = Router();

const multerUpload = multer({ dest: "uploads/" });
const logoUpload = multerUpload.fields([{ name: "logo", maxCount: 1 }]);

authRouter.post("/register", logoUpload, async (req,res) => {
    console.log(req.files.logo)
    const user = {
        companyName: req.body.companyName,
        email : req.body.email,
        password: req.body.password,
        companyWebsite:req.body.companyWebsite,
        about:req.body.about,
        /* uploadFile:req.body.uploadFile */
    }
    /* await cloudinaryUpload(req.files);  */ /*error*/

    const avatarUrl = await cloudinaryUpload(req.files);
    user["avatars"] = avatarUrl;
	

  /*   authRouter.post("/register", logoUpload, async (req, res) => {
	*/

    console.log(user)
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await db.collection("users").insertOne(user)

    return res.json({
        Message : "User has been created successfully"
    })
})

export default authRouter;
