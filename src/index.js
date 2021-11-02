// import express and start a new express server
const express = require("express");
const app = new express();

const { router } = require("./router.js");

// port for running the application
const port = process.env.PORT || 3000;

// use express json
app.use(express.json());

// api router
app.use("/api", router);

// listen to the mentioned port
app.listen(port, () => {
  console.log(`Server accessible at http://localhost:${port}`);
  console.log(`Required Endpoint http://localhost:${port}/api/getData`);
});
