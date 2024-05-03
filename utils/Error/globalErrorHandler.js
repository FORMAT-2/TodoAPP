const {statusCode} = require('./statusCode');
const errorHandler = (error, req, res, next) => {
    console.log(error);
    return res.status(statusCode.BadRequest.statusCode).send({error:error.message})
}

module.exports = { errorHandler };