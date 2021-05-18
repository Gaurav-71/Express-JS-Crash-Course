const { json } = require("express");
const express = require("express");
const uuid = require("uuid");
const router = express.Router();

const members = require("../../Members");

// gets all members
router.get("/", (req, resp) => {
  // dont need to pass full url for /api/members since it is defined in index.js
  resp.json(members);
});

// get single member
router.get("/:id", (req, resp) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    resp.json(
      members.filter((member) => member.id === parseInt(req.params.id))
    );
  } else {
    resp.status(400).json({ msg: "Member not found" });
  }
});

// create member
router.post("/", (req, resp) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return resp.status(400).json({ msg: "Please include name or email" });
  }
  members.push(newMember);
  resp.json(members); // for static
  //resp.redirect("/"); // for server side rendering
});

// update member
router.put("/:id", (req, resp) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.body.name : member.name;
        member.email = updateMember.email
          ? updateMember.body.email
          : member.email;
        resp.json({ msg: "Member has been updated succesfully", member });
      }
    });
  } else {
    resp.status(400).json({ msg: "Member not found" });
  }
});

// delete member
router.delete("/:id", (req, resp) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    resp.json({
      msg: "member deleted",
      members: members.filter((member) => {
        member.id !== parseInt(req.params.id);
      }),
    });
  } else {
    resp.status(400).json({ msg: "Member not found" });
  }
});

module.exports = router;
