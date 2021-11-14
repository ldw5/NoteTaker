const routes = require("express").Router();
const storage = require("../db/storage");
//get notes request from db
//req response from http with info, then res to send back http response
routes.get("/notes",(req,res) => {
    storage
    .getNotes().then((notes) => {
        return res.json(notes);
    }).catch((err)=> res.status(500).json(err));
});
//post request for notes to db
//req response from http with info, then res to send back http response
routes.get("/notes",(req,res) => {
    storage
    .addNotes(req.body).then((notes) => res.json(notes))
    .catch((err)=> res.status(500).json(err));
});

//delete request to remove notes from db
//req response from http with info, then res to send back http response
routes.delete("/notes/:id",(req,res) => {
    storage
    .removeNotes(req.params.id).then(() => res.json({ok:true}))
    .catch((err)=> res.status(500).json(err));
});
module.exports = routes;