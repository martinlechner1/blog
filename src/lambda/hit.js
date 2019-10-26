const DynamoDB = require("aws-sdk").DynamoDB

const dynamoDB = new DynamoDB({
  region: "eu-west-1",
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
})

exports.handler = async (event, context) => {
  await dynamoDB
    .updateItem({
      ExpressionAttributeNames: {
        "#CT": "count",
      },
      ExpressionAttributeValues: {
        ":inc": {
          N: "1",
        },
      },
      Key: {
        page: {
          S: event.queryStringParameters.page,
        },
        date: {
          S: new Date().toISOString().slice(0, 10),
        },
      },
      ReturnValues: "UPDATED_NEW",
      TableName: "tracking",
      UpdateExpression: "ADD #CT :inc",
    })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify(Object.assign(event, context)),
  }
}
