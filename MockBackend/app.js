const express = require("express");
var path = require("path");
const app = express();

app.get("/locationlist", (req, res) => {
  let locationList = [
    {
      location_id: 1,
      location_name: "Gino's Pizzeria",
      description: "my description ... "
    },
    {
      location_id: 2,
      location_name: "Big Bear",
      description: "my description ... "
    },
    {
      location_id: 3,
      location_name: "Super Store",
      description: "my description ... "
    },
    {
      location_id: 3,
      location_name: "Kelseys",
      description: "my description ... "
    },
    {
      location_id: 3,
      location_name: "Super Store",
      description: "my description ... "
    },
    {
      location_id: 3,
      location_name: "Super Store",
      description: "my description ... "
    },
    {
      location_id: 3,
      location_name: "Super Store",
      description: "my description ... "
    },
    {
      location_id: 3,
      location_name: "Super Store",
      description: "my description ... "
    },
    {
      location_id: 3,
      location_name: "Super Store",
      description: "my description ... "
    },
    {
      location_id: 3,
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

app.get("/contentlist/:display_id", (req, res) => {
  let display_id = req.params.display_id;
  
  let contentList = {
    displayId: 0,
    content: [
      {
        id: 0,
        name: "lunch menu",
        description: "Monitor above counter",
        html_code:
          "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>Lunch menu</h1>\n\n<p>Menu</p>\n\n</body>\n</html>"
      },
      {
        id: 1,
        name: "breakfast",
        description: "Monitor at entrance",
        html_code:
          "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>Lunch menu</h1>\n\n<p>Menu</p>\n\n</body>\n</html>"
      },
      {
        id: 2,
        name: "dinner",
        description: "Monitor behind customer table",
        html_code:
          "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>Lunch menu</h1>\n\n<p>Menu</p>\n\n</body>\n</html>"
      },
      {
        id: 3,
        name: "evening snacks",
        description: "I ran out of places where monitor could be",
        html_code:
          "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>Lunch menu</h1>\n\n<p>Menu</p>\n\n</body>\n</html>"
      },
      {
        id: 4,
        name: "Damn yall eat a lot",
        description: "Monitor where it should be",
        html_code:
          "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>Lunch menu</h1>\n\n<p>Menu</p>\n\n</body>\n</html>"
      }
    ]
  };

  res.send(contentList);
});

app.listen(6000, () => {
  console.log("Example app listening on port 6000!");
});
