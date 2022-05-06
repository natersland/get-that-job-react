import {Router} from "express"
import {db} from "../utils/db.js"
import bcrypt from "bcrypt"

const authRouter = Router();

authRouter.post("/register", async (req,res) => {
    const user = {
        companyName: req.body.companyName,
        email : req.body.email,
        password: req.body.password,
        companyWebsite:req.body.companyWebsite,
        about:req.body.about,
        uploadFile:req.body.uploadFile
    }
    
    console.log(user)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await db.collection("users").insertOne(user)

    return res.json({
        Message : "User has been created successfully"
    })
})

export default authRouter;
