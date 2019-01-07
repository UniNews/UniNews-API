function timeOutErrorResponse (res, msg) {
  res.contentType('application/json')
  var res_data = {}
  res_data['return_code'] = '500'
  res_data['description'] = msg
  res.send(res_data)
}

function notFoundErrorResponse (res, msg) {
  res.contentType('application/json')
  var res_data = {}
  res_data['return_code'] = '204'
  res_data['description'] = msg
  res_data['result'] = null
  res.send(res_data)
}

function successResponse (res, msg, payload) {
  res.contentType('application/json')
  var res_data = {}
  res_data['return_code'] = '200'
  res_data['description'] = msg
  res_data['result'] = payload
  res.send(res_data)
}

module.exports = {
  notFoundErrorResponse,
  timeOutErrorResponse,
  successResponse
}
