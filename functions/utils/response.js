function timeOutErrorResponse (res, res_data) {
  res.contentType('application/json')
  res_data['return_code'] = '500'
  res_data['description'] = 'The server is currently unavailable.'
  res.send(res_data)
}

function notFoundErrorResponse (res, res_data) {
  res.contentType('application/json')
  res_data['return_code'] = '204'
  res_data['description'] = 'The request could not be founded.'
  res.send(res_data)
}

function successResponse (res, res_data) {
  res.contentType('application/json')
  res_data['return_code'] = '200'
  res_data['description'] = 'Successful.'
  res.send(res_data)
}

module.exports = {
  notFoundErrorResponse,
  timeOutErrorResponse,
  successResponse
}
