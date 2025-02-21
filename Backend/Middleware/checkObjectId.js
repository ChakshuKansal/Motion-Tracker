const mongoose = require("mongoose");

const checkObjectId = (param) => (req, res, next) => {
  const id = req.params[param];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid ObjectId format" });
  }

  next();
};

module.exports = checkObjectId;
