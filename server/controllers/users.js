import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";
import bcrypt from "bcrypt";
// Schema Medels ---------------------
import UsersProfessional from "../models/UsersProfessional.js";
import UsersRecruiter from "../models/UsersRecruiter.js";
// -----------------------------------

const collection = db.collection("users");

export const createProfessional = async (req, res, next) => {
  try {
    const newProfessional = new UsersProfessional(req.body);
    await db.collection("users").insertOne(newProfessional);
    res.status(200).json(`New professional has been created successful!`);
    console.log(newProfessional);
  } catch (error) {
    next(error);
  }
};
export const createRecuiter = async (req, res, next) => {
  try {
    const newRecruiter = new UsersRecruiter(req.body);
    await db.collection("users").insertOne(newRecruiter);
    /*  const user = await collection
          .aggregate([
            {
              $addFields: {
                userId: {
                  $toString: "$_id",
                },
              },
            },
            {
              $project: {
                email: 1,
                feeds: { $concatArrays: ["$feeds", "$shared_feeds"] },
              },
            },
          ]) */
    /* .toArray() */ res
      .status(200)
      .json(`New recruiter has been created successful!`);
    console.log(newRecruiter);
    /*    res.status(200).json(user[0]);
        console.log(user[0]); */
  } catch (error) {
    next(error);
  }
};

export const getAllUserData = async (req, res, next) => {
  try {
    const users = await collection.find().toArray();
    /* const users = await collection
      .aggregate([
        {
          $lookup: {
            from: "jobs",
            localField: "_id",
            foreignField: "recruiterId",
            as: "jobs",
          },
        },
      ])
      .toArray(); */
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getOneUserData = async (req, res, next) => {
  try {
    const userId = ObjectId(req.params.id);
    /*     const user = await collection.find({ _id: userId }).toArray();
     */
    /*   const user = await collection
            .aggregate([
              {
                $addFields: {
                  userId: {
                    $toString: "$_id",
                  },
                },
              },
            ])
            .toArray(); */
    const user = await collection
      .aggregate([
        {
          $lookup: {
            from: "jobs",
            localField: "_id",
            foreignField: "recruiterId",
            as: "jobs",
          },
        },
        { $match: { _id: userId } },
      ])
      .toArray();
    res.status(200).json(user[0]);
  } catch (error) {
    next(error);
  }
};

export const changeUserPassWord = async (req, res, next) => {
  try {
    const userId = ObjectId(req.params.id);
    const userData = {
      password: req.body.password,
    };
    // hashing password
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    await collection.updateOne({ _id: userId }, { $set: userData });
    res.status(200).json(`User ${userId} has been updated successful`);
    console.log(`Updated user data id:${userId} successful!`);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = ObjectId(req.params.id);
    await collection.deleteOne({ _id: userId });
    res.status(200).json("User is has been deleted successful");
    console.log(`User ${userId} has been deleted successful`);
  } catch (error) {
    next(error);
  }
};
