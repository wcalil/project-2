$(document).ready(function() {

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.username);
    let hangouts = $("#hangouts")

    console.log(data)
    hangouts.prepend("<br>")
    data.hangouts.forEach(hangout=>{
      let hangDiv = $("<div></div>")
      let deleteButton = $("<img>")
      deleteButton.attr("src", "../images/trash.png")
      deleteButton.attr("id", "trash")
      deleteButton.on("click", handleHangoutDelete)
      deleteButton.data("post", hangout.id)
      hangDiv.append("<p> You have a new hangout " + "<spam  style='font-weight:bold'>" + hangout.HangoutInput + "</spam>" + " scheduled in " + hangout.City + "</p>" + " in " + hangout.Date);
      hangDiv.append("<p> Description: " + hangout.HangoutComment + "<p>");
      hangDiv.append(deleteButton)
      hangDiv.append("<br>")
      hangDiv.append("<hr style='border-top: 10px solid rgb(254, 250, 246)'>")
      hangouts.append(hangDiv)
     
    })
  });

  function handleHangoutDelete() {
    deletePost($(this).data("post"))
  }
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/hangout/" + id
    })
      .then(function() {
        location.reload()
      });
  }

});
