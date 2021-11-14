const express = require("express");
const htmlR = require("./routes/html");
const apiR = require("./routes/api");
// start app with a port
const PORT = process.env.PORT || 3001;
const app = express();
// setting up route middleware connections
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use("/api",apiR);
app.use("/",htmlR);
// start the server
app.listen(PORT,()=> console.log(`I'm listening on PORT: ${PORT}`));