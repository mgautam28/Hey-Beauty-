const app = require("./app");
// const config = require("./config/config");
//const https = require('https');
const https = require("http");
const fs = require("fs");
// const privateKey  = fs.readFileSync("/etc/letsencrypt/live/eacademyeducation.com/privkey.pem");
// const certificate = fs.readFileSync("/etc/letsencrypt/live/eacademyeducation.com/fullchain.pem");
// const credentials = {key: privateKey, cert: certificate};
const server = https.createServer(app);
// server.listen(config.port, () => {
//   console.log(`Listening to port ${config.port}`);
// });
server.listen(8080, () => {
  console.log(`Listening to port ${8080}`);
});
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});



