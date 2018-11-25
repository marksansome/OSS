const express = require("express");
var path = require("path");
const app = express();

app.get("/locationlist", (req, res) => {
  let locationList = [
    {
      location_id: 1,
      user_id: 100,
      location_name: "Gino's Pizzeria",
      description: "my description ... "
    },
    {
      location_id: 2,
      user_id: 200,
      location_name: "Big Bear",
      description: "my description ... "
    },
    {
      location_id: 3,
      user_id: 300,
      location_name: "Super Store",
      description: "my description ... "
    },
    {
      location_id: 3,
      user_id: 300,
      location_name: "Super Store",
      description: "my description ... "
    },
    {
      location_id: 3,
      user_id: 300,
      location_name: "Super Store",
      description: "my description ... "
    },
    {
      location_id: 3,
      user_id: 300,
      location_name: "Super Store",
      description: "my description ... "
    },
    {
      location_id: 3,
      user_id: 300,
      location_name: "Super Store",
      description: "my description ... "
    },
    {
      location_id: 3,
      user_id: 300,
      location_name: "Super Store",
      description: "my description ... "
    },
    {
      location_id: 3,
      user_id: 300,
      location_name: "Super Store",
      description: "my description ... "
    },
    {
      location_id: 3,
      user_id: 300,
      location_name: "Super Store",
      description: "my description ... "
    }
  ];

  res.send(locationList);
});

app.get("/displaylist/:location_id", (req, res) => {
  let location_id = req.params.location_id;
  
  let displayList = {
    locationId: 0,
    display: [
      {
        id: 0,
        name: "/display/live0000",
        description: "Monitor above counter"
      },
      {
        id: 1,
        name: "/display/live0001",
        description: "Monitor at entrance"
      },
      {
        id: 2,
        name: "/display/live0002",
        description: "Monitor behind customer table"
      },
      {
        id: 3,
        name: "/display/live0004",
        description: "I ran out of places where monitor could be"
      },
      {
        id: 4,
        name: "/display/live0005",
        description: "Monitor where it should be"
      },
      {
        id: 5,
        name: "/display/live0006",
        description: "Monitor Monitor"
      }
    ]
  };

  /**
   * create a bunch of those displays and populate the information
   **/
  res.send(displayList);
});

app.listen(6000, () => {
  console.log("Example app listening on port 6000!");
});
