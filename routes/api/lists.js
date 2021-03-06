const express = require("express");
const router = express.Router();
// Lists model
const List = require("../../model/List");

// auth middleware
const auth = require("../../middleware/auth");

// Get all lists
router.get("/", (req, res) => {
  List.find({})
    .sort({ date: -1 })
    .then((lists) => res.json(lists));
});

// add a list item, post route

router.post("/", auth, (req, res) => {
  let newList = new List({
    name: req.body.name,
  });
  newList
    .save()
    .then((list) => res.json(list))
    .catch((err) => res.json(err));
});

// Delete item

router.delete("/:id", auth, (req, res) => {
  let id = req.params.id;
  let query = { _id: id };
  List.findOne(query, (err, list) => {
    if (err) {
      res.status(404).json("list not found");
    } else {
      List.deleteOne(query).then(res.json(list));
    }
  });
});

module.exports = router;
