$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var postId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Getting jQuery references to the post body, hangout, form, and date select
  var hangoutForm = $("#hangoutForm");
  var HangoutInput = $("#hangout");
  var HangoutComment = $("#HangoutComment");
  var City = $("#City");
  var Date = $("#hangOutDate");
  var submitButton = $("#submitButton")
  
  // $(hangoutForm).on("submit", function handleFormSubmit(event) {
  //   event.preventDefault();
  // Giving the Date a default value
  // Date.val("Personal");
  // Adding an event listener for when the form is submitted
  submitButton.on("click", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a hangout
    if (!HangoutInput.val().trim() || !HangoutComment.val().trim()) {
      return;
    }
    // Constructing a newHangout object to hand to the database
    var newHangout = {
      HangoutInput: HangoutInput.val().trim(),
      HangoutComment: HangoutComment.val().trim(),
      City: City.val().trim(),
      Date: Date.val()
    };
    
    submitPost(newHangout);

    // console.log(newHangout);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    // if (updating) {
    //   newHangout.id = postId;
    //   updatePost(newHangout);
    // }
    // else {
    //   submitPost(newHangout);
    // }
  });

  // Submits a new post and brings user to his/her profile page upon completion
  
  function submitPost(Post) {
    console.log("Submiting Post", Post)

    $.post("/api/hangout", Post, function() {
      // window.location.href = "/members";
    });
  }

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get("/api/hangout" + id, function(data) {
      if (data) {
        // If this post exists, prefill our hangout forms with its data
        HangoutInput.val(data.HangoutInput);
        HangoutComment.val(data.HangoutComment);
        City: val(data.City);
        Date.val(data.Date);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/hangout",
      data: post
    })
      .then(function() {
        window.location.href = "/members";
      });
  }
});
