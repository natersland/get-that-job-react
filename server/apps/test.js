jobRouter.get("/", async (req, res) => {
  const jobTitle = req.query.jobTitle;
  const companyName = req.query.companyName;
  const minSalary = req.body.minSalary;
  const maxSalary = Number(req.body.maxSalary);
  const keywords = req.query.keywords;
  /* const keywordsNumber = req.query.keywordsNumber; */

  const query = {};
  /*   console.log(`5555555: ${keywordsNumber}`); */
  // Search Title
  if (jobTitle) {
    query.jobTitle = jobTitle;
  } else if (keywords) {
    query.jobTitle = new RegExp(`${keywords}`, "i");
  }
  // Search Company
  else if (companyName) {
    query.companyName = companyName;
  } else if (keywords) {
    query.companyName = new RegExp(`${keywords}`, "i");
  } else if (minSalary) {
    query.minSalary = minSalary;
  }
  // Search max salary
  else if (maxSalary) {
    query.maxSalary = maxSalary;
  } else if (keywords) {
    query.maxSalary = new RegExp(`${keywords}`, "i");
  }

  const collection = db.collection("jobs");
  const jobs = await collection.find(query).toArray();

  return res.json({
    data: jobs,
  });
});
