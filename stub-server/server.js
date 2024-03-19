const express = require("express");
const jsonBodyParser = require("body-parser").json();
const cors = require("cors");

const server = express();
server.use(cors());


server.get("/defy/medicine-list", jsonBodyParser, function (req, res) {
    console.log("Calling service" + JSON.stringify(req.query));

    let allMeds = require("./Meds.json");
    let filteredMeds = [];
    filteredMeds = allMeds.filter((med) => {
        return med.name.startsWith(req.query.searchText) || med.name.startsWith(req.query.searchText.toUpperCase());
    });

        res.status(200).send(filteredMeds);
});
 
server.listen(8090, function () {
    console.log("server running at 8090")
})
