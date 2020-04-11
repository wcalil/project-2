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
  var bodyInput = $("#hangoutComment");
  var hangoutInput = $("#hangout");
  var hangoutLocation = $("#hangoutLocation");
  var hangoutform = $("#hangoutform");
  var dateSelect = $("#hangOutDate");
  // Giving the dateSelect a default value
  // dateSelect.val("Personal");
  // Adding an event listener for when the form is submitted
  $(hangoutform).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a hangout
    if (!hangoutInput.val().trim() || !bodyInput.val().trim()) {
      return;
    }
    // Constructing a newHangout object to hand to the database
    var newHangout = {
      hangout: hangoutInput.val().trim(),
      hangoutLocation: hangoutLocation.val().trim(),
      hangoutComment: bodyInput.val().trim(),
      date: dateSelect.val()
    };

    console.log(newHangout);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newHangout.id = postId;
      updatePost(newHangout);
    }
    else {
      submitPost(newHangout);
    }
  });

  // Submits a new post and brings user to his/her profile page upon completion
  function submitPost(Post) {
    $.post("/api/hangout/", Post, function() {
      window.location.href = "/members";
    });
  }

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get("/api/posts/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        hangoutInput.val(data.hangout);
        hangoutLocation: val(data.hangoutLocation);
        bodyInput.val(data.body);
        dateSelect.val(data.date);
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
      url: "/api/hangouts",
      data: post
    })
      .then(function() {
        window.location.href = "/members";
      });
  }
});
