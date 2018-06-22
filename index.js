"use strict";

let express = require("express");
let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
});

let port = process.env.PORT || 5001;
app.listen(port);
console.log("Server works on port " + port);
console.log("--------------------------------");
console.log("\n\n\n");

app.get('/:xxx/:yyy', function(request, response) {
    console.log("----------------------------------------------");
    console.log("GET");

    // work with variables in URL
    const dictionary = request.query;
    console.log("Dictionary:");
    console.log(dictionary);
    console.log("Dictionary elements:");
    for(let key in dictionary) {
        console.log(key + " : " + dictionary[key]);
    }

    // work with path
    const xxx = request.params.xxx;
    const yyy = request.params.yyy;
    console.log("Path: " + request.url);
    console.log("Part one: " + xxx);
    console.log("Part two: " + yyy);

    // route pages html
    if(xxx === "page") {
        if(parseInt(yyy) === 1) {
            response.sendfile("static/pageFirst.html");
            return;
        }

        if(parseInt(yyy) === 2) {
            response.sendfile("static/pageSecond.html");
            return;
        }
    }

    // route styles css
    if(xxx === "style") {
        if(yyy === "first") {
            response.sendfile("static/cssONE.css");
            return;
        }

        if(yyy === "second") {
            response.sendfile("static/cssTWO.css");
            return;
        }
    }


    // send not found
    response.status(200);
    response.end("RESULT_NOT_FOUND");
});

