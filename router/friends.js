const express = require("express");

const router = express.Router();

let friends = {
  "johnsmith@gamil.com": {
    firstName: "John",
    lastName: "Doe",
    DOB: "22-12-1990",
  },
  "annasmith@gamil.com": {
    firstName: "Anna",
    lastName: "smith",
    DOB: "02-07-1983",
  },
  "peterjones@gamil.com": {
    firstName: "Peter",
    lastName: "Jones",
    DOB: "21-03-1989",
  },
};

// GET request: Retrieve all friends
router.get("/", (req, res) => {
  res.send(friends);
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email", (req, res) => {
  const email = req.params.email;
  if (email in friends) {
    res.send(friends[email]);
  } else {
    res.status(404).send("Friend not found");
  }
});

// POST request: Add a new friend
router.post("/", function (req, res) {
  if (req.body.email) {
    friends[req.body.email] = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      DOB: req.body.DOB,
    };
  }
  res.send("The user" + " " + req.body.firstName + " Has been added!");
});

// PUT request: Update the details of a friend with email id
// PUT request: Update the details of a friend with email id
router.put("/:email", function (req, res) {
  const email = req.params.email;
  let friend = friends[email];
  if (friend) {
    //Check is friend exists
    let DOB = req.body.DOB;
    //Add similarly for firstName
    let firstName = req.body.firstName;
    //Add similarly for lastName
    let lastName = req.body.lastName;
    //if DOB the DOB has been changed, update the DOB
    if (DOB) {
      friend["DOB"] = DOB;
    }
    //Add similarly for firstName
    if (firstName) {
      friend["firstName"] = firstName;
    }
    //Add similarly for lastName
    if (lastName) {
      friend["lastName"] = lastName;
    }
    friends[email] = friend;
    res.send(`Friend with the email  ${email} updated.`);
  } else {
    res.send("Unable to find friend!");
  }
});

// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  if (email in friends) {
    delete friends[email];
    res.send(`Friend with the email ${email} deleted.`);
  } else {
    res.status(404).send("Friend not found");
  }
});

module.exports = router;
