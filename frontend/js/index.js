$(document).ready(function() {
  getLocationList();

  /**
   * When application loads
   */
  $("#locations-view").show();
  $("#displays-view").hide();
  $("#content-view").hide();

  $("#locations-button").click(function() {
    alert('Locations will change');
    $("#locations-view").show();
    $("#displays-view").hide();
    $("#content-view").hide();

    $("#locations-button").attr("disabled", false);
    $("#displays-button").attr("disabled", true);
    $("#content-button").attr("disabled", true);
  });

  $("#displays-button").click(function() {
    $("#locations-view").hide();
    $("#displays-view").show();

    $("#content-button").hide();
    $("#displays-button").attr("disabled", true);
    $("#crumb1").show();
    $("#crumb2").hide();
  });
});


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
            +'<button class="btn card-button">View Display</button>'
            +'<button class="btn edit-button" data-toggle="modal" data-target="#testModal" onclick="createModal()">Edit</button>' 
            + '</div>' 
            +'</div>'
            +'</div>';
  
  return card;
}

function getLocationList() {

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
  console.log("append card");
  let card = createLocationCard(item);
  row.innerHTML = row.innerHTML + card;

}

function createRow(){
  let row = document.createElement('div');
  $(row).addClass("row");
  return row;
}


function getDisplayList(locationId){

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

      let di = document.getElementById('display-panel');
      let newRow = false;

      counter = 1;
      let row = createRow();

      let location_panel = document.getElementById("display-panel");

      let displayList = success.display;

       for(let item of displayList){
         
          if(counter % 4 == 0){
            newRow = true;

            /**
             * placement of new row and cards in it
             */
            let location_panel = document.getElementById("display-panel");
            let card = createDisplayCard(item);
            row.innerHTML = row.innerHTML + card;
            $(location_panel).append(row);
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