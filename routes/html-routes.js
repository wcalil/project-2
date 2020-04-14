// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models")

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/newHangout", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/newHangout.html"));
  });

  app.get("/hangout/:id", function (req, res) {
    console.log("ID Route", req.params.id)
    res.sendFile(path.join(__dirname, "../public/newHangout.html"));
  });


  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/newsFeed", isAuthenticated, function (req, res) {
    db.Hangout.findAll({include: [db.User]}).then(function (dbHangout) {
      // console.log(dbHangout)

      const hangoutArray = dbHangout.map(h => {
        let Attendees = JSON.parse(h.HangoutAtendees) || []
        console.log(h.User.username)
        Attendees = Attendees.map(a => a.username)
        return {
          id: h.id,
          UserId: h.User.username,
          Date: h.Date,
          City: h.City,
          HangoutInput: h.HangoutInput,
          HangoutComment: h.HangoutComment,
          Attendees: Attendees
        }
      })
      res.render("newsFeed", { Hangout: hangoutArray });
    })
  });

};
