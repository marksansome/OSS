$(document).ready(function() {
  getLocationList();
  // displayViewActive();
  //locationViewActive();
  // $("#edit-display-modal").modal('show');
  $("#locations-button").click(function() {
    getLocationList();
    locationViewActive();
  });

  $("#displays-button").click(function() {
    displayViewActive();
  });
  
  $("#add-button").click(function() {
    if ( $("#locations-view").is(":visible")) {
      $("#create-location-modal").modal('show');
    } 
    else if ( $("#displays-view").is(":visible")){
      $("#create-display-modal").modal('show');
    }
  });
});

function locationViewActive() {
  $("#locations-view").show();
  $("#displays-view").hide();
  $("#content-view").hide();

  $("#locations-button").attr("disabled", true);
  $("#displays-button").attr("disabled", false);
  //$("#content-button").attr("disabled", false);
  $("#displays-button").hide();
  $("#content-button").hide();
  $("#crumb1").hide();
  $("#crumb2").hide();
}

function displayViewActive() {
  $("#locations-view").hide();
  $("#displays-view").show();
  $("#content-view").hide();
  $("#locations-button").attr("disabled", false);
  $("#displays-button").attr("disabled", true);
  //$("#content-button").attr("disabled", false);
  $("#displays-button").show();
  $("#content-button").hide();
  $("#crumb1").show();
  $("#crumb2").hide();
}
/*
function contentViewActive() {
  $("#locations-view").hide();
  $("#displays-view").hide();
  $("#content-view").show();
  $("#locations-button").attr("disabled", false);
  $("#displays-button").attr("disabled", false);
  $("#content-button").attr("disabled", true);
}
*/

function createLocationCard(cardObj) {
  let card = '<div class="col-md-3 col-sm-6">'
            + '<div class="card">'
            +'<div class="card-body">'
            +'<h5 class="card-title">Location: <span id ="loc-name-'+ cardObj.id  + '" >' + cardObj.name + '</span></h5>' 
            +'<p class="card-text" >Address: <span id ="loc-address-'+ cardObj.id  + '" >' + cardObj.address + '</span></p>' 
            +'<p class="card-text" >Details: <span id ="loc-detail-'+ cardObj.id  + '" >' + cardObj.details + '</span></p>' 
            +'<button class="btn card-button" onClick="getDisplayList('+ cardObj.id +')">View Location</button>'
            +'<button class="btn edit-button" data-toggle="modal" data-target="#testModal" onclick="showEditModal('+ cardObj.id +')">Edit</button>' 
            + '</div>' 
            +'</div>'
            +'</div>';
  
  return card;
}

function createDisplayCard(dispObj) {
  let card = '<div class="col-md-3 col-sm-6">'
            + '<div class="card">'
            +'<div class="card-body">'
            +'<h5 class="card-title" >Display: <span id ="disp-name-'+ dispObj.display_id  + '">' + dispObj.display_name + '</span></h5>' 
            +'<p class="card-text" >Description: <span id ="disp-desc-'+ dispObj.display_id  + '" >' + dispObj.description + '</span></p>' 
            +'<button class="btn card-button" onClick="getContent('+ dispObj.display_id +')">View Display</button>'
            +'<button class="btn edit-button" data-toggle="modal" data-target="#testModal" onclick="showEditModal('+ dispObj.display_id +')">Edit</button>' 
            + '</div>' 
            +'</div>'
            +'</div>';
  
  return card;
}

function showCreateModal(){
  /**
   * Clear previously entered values inside the show create modal
   */
   if(document.getElementById('createLocationName').value != null){
    document.getElementById('createLocationName').value = '';
   }

   if(document.getElementById('createLocationDesc').value != null){
    document.getElementById('createLocationDesc').value = '';
   }

   if(document.getElementById('createDisplayName').value != null){
    document.getElementById('createDisplayName').value = '';
   }

   if(document.getElementById('createDisplayDesc').value != null){
    document.getElementById('createDisplayDesc').value = '';
   }
}

function showEditModal(id){
    if ( $("#locations-view").is(":visible")) {
      $("#edit-location-modal").modal('show');
      console.log('location ' + id);

      /**
       * Set the values inside edit block
       */
      document.getElementById('editLocationName').value = document.getElementById('loc-name-' + id).innerText;
      document.getElementById('editLocationAddress').value = document.getElementById('loc-address-' + id).innerText;
      document.getElementById('editLocationDesc').value = document.getElementById('loc-detail-' + id).innerText;
    } 
    else if ( $("#displays-view").is(":visible")){
      $("#edit-display-modal").modal('show');
      console.log('display ' + id);

      document.getElementById('editDisplayName').value = document.getElementById('disp-name-' + id).innerText;
      document.getElementById('editDisplayDesc').value = document.getElementById('disp-desc-' + id).innerText;
    }
}

function postNewLocation(){
  let locationName = document.getElementById('createLocationName').value;
  let locationDescription = document.getElementById('createLocationDesc').value;
  console.log('New location to be added: ');
  console.log(locationName);
  console.log(locationDescription);

  /**
   * Make a post request here and finish this part
   */
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
      let displayList = success.locations.displays;

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

       $(display_panel).append(row);
       console.log($(display_panel));
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


 function getContent(){
  $("#locations-view").hide();
  $("#displays-view").hide();
  $("#content-view").show();

  $('#summernote').summernote({
    placeholder: 'Hello bootstrap 4',
    tabsize: 2,
    height: 200,
    width: 200
  });
 }