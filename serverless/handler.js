"use strict";

const MAIN = "main"
const ORIGIN = "https://cheezbuzz.com"
const ORIGIN = "*"
const TABLE = "chbz"
const AWS = require("aws-sdk")
const dynamodb = new AWS.DynamoDB()

module.exports.get = (event, context, callback) => {
  let params = {
    AttributesToGet: [
      "data"
    ],
    Key: {
      "id": {
        "S": MAIN
      }
    },
    TableName: TABLE
  }
  dynamodb.getItem(params, (err, data) => {
    if (!err) {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": ORIGIN,
        },
        body: data.Item.data.S.toString().trim()
      })
    }
  })
}

module.exports.put = (event, context, callback) => {
  if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    const STATE = JSON.stringify(body.state)
    let params = {
      Item: {
        "id": {
          S: MAIN
        },
        "data": {
          S: STATE
        }
      },
      TableName: TABLE
    }
    dynamodb.putItem(params, (err, data) => {
      if (!err) {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": ORIGIN,
          },
          body: STATE
        })
      }
    })
  }
}
