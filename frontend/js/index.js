$(document).ready(function() {
  getLocationList();

  $("#locations-view").show();
  $("#displays-view").hide();
  $("#content-view").hide();

  $("#locations-button").click(function() {
    $("#locations-view").show();
    $("#displays-view").hide();
    $("#content-view").hide();

    $("#locations-button").attr("disabled", true);
    $("#displays-button").hide();
    $("#content-button").hide();
    $("#crumb1").hide();
    $("#crumb2").hide();
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

$(document).ready(function() {});

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

function createLocationCard(cardObj) {
  let display = document.getElementById("location-panel");

  cardObj.title = "Edit Location";

  let string = JSON.stringify(cardObj);

  let card = '<div class="col-md-3 col-sm-6">'
            + '<div class="card">'
            +'<div class="card-body">'
            +'<h5 class="card-title" id ="loc-name-'+ cardObj.location_id  + '">Location: ' + cardObj.location_name + '</h5>' 
            +'<p class="card-text" id ="loc-desc-'+ cardObj.location_id  + '">Address: ' + cardObj.description + '</p>' 
            +'<button class="btn card-button">View Location</button>'
            +'<button class="btn edit-button" data-toggle="modal" data-target="#testModal" onclick="createModal()">Edit</button>' 
            + '</div>' 
            +'</div>'
            +'</div>';
  

            console.log(card);

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
          }

          if(counter % 4 == 1 || counter % 4 == 2 || counter % 4 == 3){
            newRow = false;
          }

          if(newRow == true){
            let card = createLocationCard(item);
            row.innerHTML = row.innerHTML + card;
            $(location_panel).append(row);
          }

          if(newRow == false){

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