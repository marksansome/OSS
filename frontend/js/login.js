function userLogin() {
  $.ajax({
    url: "/user-login",
    type: "GET",
    dataType: "html",
    processData: false,
    success: success => {
      /**
       * Get the login data here
       */

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
