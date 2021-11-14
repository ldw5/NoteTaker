const fs = require("fs");
const util = require("util");
//package for unique ids
const uuidv = require("../node_modules/uuid/dist/v1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Storage {
    read() {
        return readFileAsync("db/db.json","utf-8");
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }
    
    //try allows you to define a block of code to be tested for errors while it is being executed
    //catch allows you to define a block of code to be executed, if an error occurs in the try block
    getNotes() {
        return this.read().then((notes)=> {
            let parsedNotes;
            try{
                parsedNotes = [].concat(JSON.parse(notes));
            }catch (err) {
                parsedNotes=[];
            }return parsedNotes;
        });
    }
    addNotes(notes){
        const { title, text } = notes;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }
    const newNote = { title, text, id: uuidv() };

    return this.getNotes()
      .then((notes) => [...notes, newNote]).then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }
  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id)).then((filteredNotes) => this.write(filteredNotes));
  }
}
module.exports = new Storage();
