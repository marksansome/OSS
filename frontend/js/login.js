function userLogin() {
  $.ajax({
    url: "/user-login",
    type: "GET",
    dataType: "html",
    processData: false,
    success: success => {
      /**
       * Get the login data here
       * test to see if it's empty
       */

      if ($("#user_name").val() == "" || $("#password").val() == "") {
        toastr.error("Invalid username or password");
        return;
      }

      document.open();
      document.write(success);
      document.close();
    },
    error: error => {
      console.log("Login error");
      console.log(error);
    }
  });
}

function openViewer() {
  $.ajax({
    url: "/viewer-login",
    type: "GET",
    dataType: "html",
    processData: false,
    success: success => {
      document.open();
      document.write(success);
      document.close();
    },
    error: error => {
      console.log("Login error");
      console.log(error);
    }
  });
}

function showContent() {
  let displayId = document.getElementById("viewerid").value;

  if (displayId == "") {
    return toastr.error("Enter a valid display id");
  }

  /**
   * Make an ajax call that returns the html needed to be displayed on the viewer for display
   */
  $.ajax({
    url: "/viewer-page/" + displayId,
    type: "GET",
    dataType: "json",
    processData: false,
    success: success => {
      console.log(success);
      console.log(success.displays.content);

      /**
       * Write content here
       */
      var doc = document.getElementById("viewer-content").contentWindow.document;
      doc.open();
      doc.write(success.displays.content);
      doc.close();
      return toastr.success("Found content");
    },
    error: error => {
      document.getElementById( 'viewer-content' ).setAttribute( 'src', '' );
      return toastr.error("Display ID does not exist in system");

      console.log(error);
    }
  });
}
