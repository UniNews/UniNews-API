function notFoundErrorResponse(res, data) {
  res.contentType("application/json");
  res.status(204).send(data);
}

function timeOutErrorResponse(res, err) {
  res.contentType("application/json");
  res.status(500).send(err);
}

function successResponse(res, data) {
  res.contentType("application/json");
  res.status(200).send(data);
}

module.exports = {
  notFoundErrorResponse,
  timeOutErrorResponse,
  successResponse
};
