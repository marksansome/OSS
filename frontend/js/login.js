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

      if($('#user_name').val() == '' || $("#password").val() == ''){
        toastr.error('Invalid username or password');
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


function openViewer(){
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
