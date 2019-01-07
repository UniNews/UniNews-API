function timeOutErrorResponse (res, msg) {
  res.contentType('application/json')
  var res_data = {}
  res_data['return_code'] = '500'
  res_data['description'] = msg
  res.send(res_data)
}

function notFoundErrorResponse (res) {
  res.contentType('application/json')
  var res_data = {}
  res_data['return_code'] = '204'
  res_data['description'] = 'The request could not be founded.'
  res_data['result'] = null
  res.send(res_data)
}

function successResponse (res, data) {
  res.contentType('application/json')
  var res_data = {}
  res_data['return_code'] = '200'
  res_data['description'] = 'Successful.'
  res_data['result'] = data
  res.send(res_data)
}

module.exports = {
  notFoundErrorResponse,
  timeOutErrorResponse,
  successResponse
}
