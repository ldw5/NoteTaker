const routes = require("express").Router();
const path = require("path");
//get info from notes html
//req response from http with info, then res to send back http response
routes.get("/notes",(req,res) => {
    res.sendFile(path.join(__dirname,"../public/notes.html"));
});
//other route info from index file
//req response from http with info, then res to send back requested http response
routes.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../public/index.html"));
});
module.exports = routes;