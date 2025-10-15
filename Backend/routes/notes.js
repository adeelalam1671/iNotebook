const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/notes");
//route 1: get all notes  using  get "/api/auth/getuser ".login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const Notes = await Note.find({ user: req.user.id });
    res.json(Notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});
//route 2: get all new notes  using  get "/api/auth/getuser ".login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Password must be at least 5 chars long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const Notes = await Note.find({ user: req.user.id });

      const { title, description, tag } = req.body;
      // if there are request then send a bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);
//route 3: Updating existing notes  using  post "/api/auth/updateNote ".login required
router.put("/updateNote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //create object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  // find a note and update
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("note not found");
  } else if (note.user.toString() !== req.user.id) {
    return res.status(404).send("Not Allowed");
  } else {
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  }
});
//route 4: deleting existing notes  using  delete "/api/auth/deleteNote ".login required
router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
  // find a note and update
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("note not found");
    //Allow deletion only if user own del
  } else if (note.user.toString() !== req.user.id) {
    return res.status(404).send("Not Allowed");
  } else {
    note = await Note.findByIdAndDelete(
      req.params.id,
      
    );
    res.json({ "Success":"Note has been deleleted" });
  }
});
module.exports = router;
