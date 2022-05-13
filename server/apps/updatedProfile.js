import { Router } from "express";
import { client } from "../utils/db.js";
import { ObjectId } from "mongodb";
//import { db } from "../utils/db.js";

const profileRouter = Router();

/*profileRouter.get("/", async (req, res) => {
  const companyName =  req.body.companyName;
  const keywords = req.query.keywords;

  const query = {};

  if (companyName) {
    query.companyName = companyName;
  } else if (keywords) {
    query.companyName = new RegExp(`${keywords}`, "i");
  }
 

  const collection = db.collection("users");
  const result = await collection.find(query).toArray();

  return res.json({
    data: result,
  });
});*/


profileRouter.get ("/:id", async (req, res) => { 
    const profileId = ObjectId(req.params.id);
    const db = client.db("gtj-database")
    const collection = db.collection("users")
    const results = await collection.find({ _id: profileId }).toArray();
    return res.json({ data: results[0], });
  })
  

 profileRouter.put ("/:id", async (req, res) => { 
   const profileId = ObjectId (req.params.id);
    const updatePostData = {...req.body}
    const db = client.db("gtj-database")
    const collection = db.collection("users");
    await collection.updateOne 
  ( { _id: profileId},
      {$set: updatePostData } )
    return res.json({ message: `Profile ${profileId} has been updated.`, });
  }); 

  export default profileRouter;
