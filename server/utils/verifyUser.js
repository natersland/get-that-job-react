export const verifyUser = () => {
  try {
    const user = await db.collection("users").findOne({
        userId: req.body._id,
      });

      if (!user) {
        return next(createError(400, "User not found"));
      }
  
  } catch (error) {
    next(error);
  }
};
