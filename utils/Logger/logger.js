const fs = require('fs-extra')

const logger = (req, res, next) => {
    res.on("finish", function() {
      console.log(req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
      var log = {
        time: new Date(Date.now()).toISOString(),
        method: req.method,
        ip:req.ip,
        url: decodeURI(req.url),
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        body: req.body,
        query: req.query,
        params: req.params
      };
      fs.outputJSON(
        "./logs/app.log",log,
        { flag: "a+" }
      );
    });
    next();
  };
module.exports = {logger};