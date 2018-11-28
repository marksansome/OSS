$(document).ready(function() {
  getLocationList();
  locationViewActive();

  $("#locations-button").click(function() {
    getLocationList();
    locationViewActive();
  });

  $("#displays-button").click(function() {
    $("#locations-view").hide();
    $("#displays-view").show();

    $("#content-button").hide();
    $("#displays-button").attr("disabled", false);
    $("#content-button").attr("disabled", false);
    $("#crumb1").show();
    $("#crumb2").hide();
  });

  $("#content-button").click(function() {

  });
});

function locationViewActive() {
  $("#locations-view").show();
  $("#displays-view").hide();
  $("#content-view").hide();

  $("#locations-button").attr("disabled", true);
  $("#displays-button").attr("disabled", false);
  $("#content-button").attr("disabled", false);
  $("#displays-button").hide();
  $("#content-button").hide();
  $("#crumb1").hide();
  $("#crumb2").hide();
}

function displayViewActive() {
  $("#locations-view").hide();
  $("#displays-view").hide();
  $("#content-view").show();
  $("#locations-button").attr("disabled", false);
  $("#displays-button").attr("disabled", true);
  $("#content-button").attr("disabled", false);
  $("#displays-button").hide();
  $("#crumb1").show();
  $("#crumb2").show();
}

function contentViewActive() {
  $("#locations-view").hide();
  $("#displays-view").hide();
  $("#content-view").show();
  $("#locations-button").attr("disabled", false);
  $("#displays-button").attr("disabled", false);
  $("#content-button").attr("disabled", true);
}

function createModal(obj) {
  console.log('Object received');
  console.log(obj);

  let modal =
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
    '<h4 class="modal-title">' +
    /* Modal title*/ +"</h4> </div>" +
    '<div class="modal-body">' +
    '<form action="' +
    /* Add form action*/ +'">' +
    '<div class="form-group">' +
    '<label for="' +
    /* location name */ +'">' +
    /* Displayed label name*/ +"</label>" +
    '<input type="text" class="form-control" id="' +
    /* location name variable */ +'"></div>' +
    '<div class="form-group">';
  '<label for="' +
    /* location address variable */ +'">' +
    /* Displayed label name */ +"</label>" +
    '<input type="text" class="form-control"id="' +
    /* location address variable */ +'"></div>' +
    '<button type="submit" class="btn btn-default">' +
    /* submit label */ +"</button>" +
    "</form>" +
    "</div>" +
    "</div>" +
    "</div>";

  let modelHolder = document.getElementById("testModal");
  console.log(modelHolder);

  $(modelHolder).append(modal);
}


let locationCardElement = {
  type : "loc",
  title : "Location",
  text  : "Address",
  button : {
    btn1 : "View Location",
    btn2 : "Edit"
  }
}

function createLocationCard(cardObj) {
  let card = '<div class="col-md-3 col-sm-6">'
            + '<div class="card">'
            +'<div class="card-body">'
            +'<h5 class="card-title" id ="loc-name-'+ cardObj.location_id  + '">Location: ' + cardObj.location_name + '</h5>' 
            +'<p class="card-text" id ="loc-desc-'+ cardObj.location_id  + '">Address: ' + cardObj.description + '</p>' 
            +'<button class="btn card-button" onClick="getDisplayList('+ cardObj.location_id +')">View Location</button>'
            +'<button class="btn edit-button" data-toggle="modal" data-target="#testModal" onclick="createModal()">Edit</button>' 
            + '</div>' 
            +'</div>'
            +'</div>';
  
  return card;
}


let displayCardElement = {
  type: "disp",
  title : "Display",
  text  : "Description",
  button : {
    btn1 : "View Display",
    btn2 : "Edit"
  }
}


function createDisplayCard(dispObj) {
  let card = '<div class="col-md-3 col-sm-6">'
            + '<div class="card">'
            +'<div class="card-body">'
            +'<h5 class="card-title" id ="disp-name-'+ dispObj.id  + '">Display: ' + dispObj.name + '</h5>' 
            +'<p class="card-text" id ="disp-desc-'+ dispObj.id  + '">Description: ' + dispObj.description + '</p>' 
            +'<button class="btn card-button" onClick="getContentList('+ dispObj.id +')">View Display</button>'
            +'<button class="btn edit-button" data-toggle="modal" data-target="#testModal" onclick="createModal()">Edit</button>' 
            + '</div>' 
            +'</div>'
            +'</div>';
  
  return card;
}

let contentElement = {
  type: "cont",
  title: "Content",
  text: "Description",
  button: {
    btn1 : "View",
    btn2 : "Edit"
  }
}

function createContentCard(contObj) {
  let card = '<div class="col-md-3 col-sm-6">'
            + '<div class="card">'
            +'<div class="card-body">'
            +'<h5 class="card-title" id ="cont-name-'+ contObj.id  + '">Content: ' + contObj.name + '</h5>' 
            +'<p class="card-text" id ="cont-desc-'+ contObj.id  + '">Description: ' + contObj.description + '</p>' 
            +'<button class="btn card-button">View Content</button>'
            +'<button class="btn edit-button" data-toggle="modal" data-target="#testModal" onclick="createModal()">Edit</button>' 
            + '</div>' 
            +'</div>'
            +'</div>';
  
  return card;
}


function getLocationList() {
  /**
   * Clear the previous cards on the view
   */
  document.getElementById('location-panel').innerHTML = "";


  $.ajax({
    url: "/location-list",
    type: "GET",
    dataType: "json",
    processData: false,
    success: success => {
      let location_panel = document.getElementById('location-panel');
      let newRow = false;

      counter = 1;
      let row = createRow();
       for(let item of success){
         
          if(counter % 4 == 0){
            newRow = true;

            /**
             * placement of new row and cards in it
             */
            let display = document.getElementById("location-panel");
            let card = createLocationCard(item);
            row.innerHTML = row.innerHTML + card;
            $(location_panel).append(row);
          }
          else {
            newRow = false;

            /**
             * placement of cards in previously created row
             */
            let card = createLocationCard(item);
            row.innerHTML = row.innerHTML + card;
          }
          
          counter++;
       }
    },
    error: error => {
      console.log(error);
    }
  });
}

function appendCard(row){
  let card = createLocationCard(item);
  row.innerHTML = row.innerHTML + card;
}

function createRow(){
  let row = document.createElement('div');
  $(row).addClass("row");
  return row;
}


function getDisplayList(locationId) {
  /**
   * Clear the previous cards on the view
   */
  document.getElementById('display-panel').innerHTML = "";

  /**
   * Crumb Trail Changes
   */
  $("#locations-view").hide();
  $("#displays-view").show();
  $("#content-view").hide();
  $("#locations-button").attr("disabled", false);
  $("#displays-button").attr("disabled", true);
  $("#content-button").attr("disabled", true);

  $.ajax({
    url: "/display-list/" + locationId,
    type: "GET",
    dataType: "json",
    processData: false,
    success: success => {
      let newRow = false;

      counter = 1;
      let row = createRow();

      let display_panel = document.getElementById("display-panel");
      let displayList = success.display;

       for(let item of displayList){
         
          if(counter % 4 == 0){
            newRow = true;

            /**
             * placement of new row and cards in it
             */
            let display_panel = document.getElementById("display-panel");
            let card = createDisplayCard(item);
            row.innerHTML = row.innerHTML + card;
            $(display_panel).append(row);
          }
          else {
            newRow = false;

            /**
             * placement of cards in previously created row
             */
            let card = createDisplayCard(item);
            row.innerHTML = row.innerHTML + card;
          }
          
          counter++;
       }
    },
    error: error => {
      console.log(error);
    }
  });
}

function getContentList(displayId){
  /**
   * Clear the previous cards on the view
   */
  document.getElementById('content-panel').innerHTML = "";

  $("#locations-view").hide();
  $("#displays-view").hide();
  $("#content-view").show();

  $.ajax({
    url: "/content-list/" + displayId,
    type: "GET",
    dataType: "json",
    processData: false,
    success: success => {

      let content_panel = document.getElementById('content-panel');
      let newRow = false;
      let contentList = success.content;

      counter = 1;
      let row = createRow();
       for(let item of contentList){         
          if(counter % 4 == 0){
            newRow = true;

            /**
             * placement of new row and cards in it
             */
            let display = document.getElementById("content-panel");
            let card = createContentCard(item);
            row.innerHTML = row.innerHTML + card;
            $(content_panel).append(row);
          }
          else {
            newRow = false;

            /**
             * placement of cards in previously created row
             */
            let card = createContentCard(item);
            row.innerHTML = row.innerHTML + card;
          }
          
          counter++;
       }
    },
    error: error => {
      console.log(error);
    }
  });
}

/**
 * Logout the user
 */
 function userLogout(){
  $.ajax({
    url: "/user-logout",
    type: "GET",
    dataType: "json",
    processData: false,
    success: success => {
      $("html").load(success);
    },
    error: error => {
      console.log(error);
    }
  });
 }