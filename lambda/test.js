const AWS = require("aws-sdk")

const dynamoDB = new AWS.DynamoDB()

exports.handler = (event, context, callback) => {
  dynamoDB.updateItem(
    {
      ExpressionAttributeNames: {
        "#CT": "count",
      },
      Key: {
        page: {
          S: "test",
        },
        date: {
          S: new Date().toISOString().slice(0, 10),
        },
      },
      ReturnValues: "UPDATED_NEW",
      TableName: "tracking",
      UpdateExpression: "SET #CT = #CT + 1",
    },
    () =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(Object.assign(event, context)),
      })
  )
}
