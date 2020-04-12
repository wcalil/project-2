var db = require("../models");



module.exports = function(app){

// Creates route for posting User interest

app.post("/api/interest", function(req,res) {
    console.log(req.body);
    db.Interest.create({
        Interest: req.body.Interest
    })
    .then(function(dbInterest){
        res.json(dbInterest)
    })
});

// Delete route for User interests

app.delete("/api/interest/:id", function(req,res) {
    db.Interest.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(function(dbInterest){
        res.json(dbInterest);
    })
})

// Update your Users interests

app.put("/api/interest", function(req,res) {
    db.Interest.update(req.body,{ where: {id: req.body.id}}
    ).then(function(dbInterest) {
        res.json(dbInterest);
    })
})
};

