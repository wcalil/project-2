$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.username);
    let hangouts = $("#hangouts")

    console.log(data)
    hangouts.prepend("<br>")
    data.hangouts.forEach(hangout=>{
      let hangDiv = $("<div></div>")
      hangDiv.append("<p> You have the Hangout " + hangout.InterestId + " scheduled in " + hangout.City + "</p> <br>");
      hangouts.append(hangDiv)
    
    })
  });
});
