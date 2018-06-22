"use strict";

let express = require("express");
let app = express();

// object for working with cookies
let cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // prohibit cache
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

    // redirect to other page
    if(xxx === "movepage") {
        if(parseInt(yyy) === 1) {
            response.header("Location", "/page/1");
            response.status(301);
            response.end("GO");
            return;
        }

        if(parseInt(yyy) === 2) {
            response.header("Location", "/page/2");
            response.status(301);
            response.end("GO");
            return;
        }
    }

    // add new cookies and rewrite old cookies
    if(xxx === "addcookies") {
        for(let key in dictionary) {
            const value = dictionary[key];
            setMyCookie(response, key, value);
        }

        response.status(200);
        response.end("ADD_COOKIES_OK");
        return;
    }

    // get list of existing cookies
    if(xxx === "getcookies") {
        const content = getCookiesString(request.cookies);
        console.log("Cookies content: " + content);
        response.status(200);
        response.end(content.toString());
        return;
    }

    // send not found
    response.status(200);
    response.end("RESULT_NOT_FOUND");
});


// cookie functions

const bigNumber = 999999999999;

function setMyCookie(response, key, value) {
    response.cookie(key, value, {
        expires: new Date(Date.now() + bigNumber),
        path: "/",
    });
}

function getCookiesString(cookies) {
    let contentString = "";
    for(let key in cookies) {
        contentString = contentString + key + "=" + cookies[key] + ";";
    }
    return contentString;
}
