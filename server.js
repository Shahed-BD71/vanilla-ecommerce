const express = require("express");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const path = require("path");
let staticPath = path.join(__dirname, "public");
const app = express();
// firebase admin setup
var serviceAccount = require("./vanilla-ecommerce-firebase-adminsdk-9fic6-e3ebca36c9.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//middlewares
app.use(express.static(staticPath));
app.use(express.json()); //receiving form data

// routes..
// home route
app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

//signup route...
app.get("/sign-up", (req, res) => {
  res.sendFile(path.join(staticPath, "sign-up.html"));
});

app.post("/sign-up", (req, res) => {
  let { name, email, password, number, tac, notification } = req.body;
  if (name.length < 3) {
    return res.json({ alert: "name must be 3 letters long" });
  } else if (!email.length) {
    return res.json({ alert: "enter your email" });
  } else if (password.length < 8) {
    return res.json({ alert: "password should be 8 letters long" });
  } else if (!number.length) {
    return res.json({ alert: "enter your phone number" });
  } else if (!Number(number) || number.length < 10) {
    return res.json({ alert: "invalid number, please enter valid one" });
  } else if (!tac) {
    return res.json({ alert: "you must agree to our terms and conditions" });
  }
  // store user in db
  let db = admin.firestore();
  db.collection("users")
    .doc(email)
    .get()
    .then((user) => {
      if (user.exists) {
        return res.json({ alert: "email already exists" });
      } else {
        // encrypt password before store
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash;
            db.collection("users")
              .doc(email)
              .set(req.body)
              .then((data) => {
                res.json({
                  name: req.body.name,
                  email: req.body.email,
                  seller: req.body.seller,
                });
              });
          });
        });
      }
    });
});

// 404 route..
app.get("/404", (req, res) => {
  res.sendFile(path.join(staticPath, "404.html"));
});
app.use((req, res) => {
  res.redirect("/404");
});

// root..
app.listen(3000, () => {
  console.log("listening on port 3000");
});
