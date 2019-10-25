exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body:
      JSON.stringify(event) +
      JSON.stringify(context) +
      "No worries, all is working fine!",
  })
}
