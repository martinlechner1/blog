---
title: Serverless Tracking on a budget
date: "2019-10-27T22:50:32.169Z"
description: GDPR compliant tracking with Netlify functions and DynamoDB 
---

Since launching this website I had the idea to have some form of hit counter to see how many people visit each page. It is also very important for me to respect visitor's privacy. I was looking a bit around, but did not find a good solution which fulfills this simple usecase for free. Therefore I decided to write my own tracking.

## Netlify functions
My website is already deployed on Netlify so naturally I was looking into options there.
I know that my website is not high volume, which makes the free tier of Netlify functions a perfect fit to glue the events from the website to some serverless data store. My website consists of a Gatsby project deployed on netlify, so I had to figure out how to deploy the function alongside.

Note: All code is included in the [Github Sources](https://github.com/martinlechner1/blog) of this blog.

Setting up a function consists of multiple steps (assuming that your project uses yarn to build):

* Create a netlify.toml and add:
```
[build]  
  functions = "lambda"
  publish = "public"
  command = "yarn build"
```
* `yarn add netlify-lambda`
* Add `&& netlify-lambda build src/lambda` to the build step in `package.json`
* Add `"postinstall": "netlify-lambda install src/lambda",` to `package.json`
* Create folder `src/lambda`. I decided to `npm init` in the folder, since my function needs `aws-sdk`
* Create a dummy function in `filename.js`, e.g. 
  
```javascript
export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello world` })
  };
}
```

* Commit, push and wait for netlify deployment
* Do a request to `yoursite.com/.netlify/functions/filename` to check whether it works
* For local dev `netlify-lambda serve src/lambda` can be used. It exposes the functions on port `9000`, so you can request `localhost:9000/.netlify/functions/filename`

## Storing the data

Now that we have a foundation to deploy netify functions we can focus back on the initial goal, which was creating a hit counter. I first thought about using google sheets api, but didn't like the documentation somehow and knew already how to do it with DynamoDB. 

DynamoDB is a column based serverless distributed key-value store. The basic idea is that data is partitioned and queryable by partition key with an optional sort key for ordering. AWS documentation is quite extensive, please check it out for more details.

We will store (and increment) the count for every page on a daily basis. The partition key will be the `page` and the sort key will be the `date`. This is optimized for getting all data for a page. If you want to query date first you could make date the partition key or add a global secondary index to the table, which supports the other access pattern.

DynamoDB is available in the free tier of AWS, so the only prequisite is having an AWS account. I will quickly walk you through the steps to set it up (This might be hard if you do not have any AWS experience. Follow the documentation of aws if it is unclear):

* Log into AWS console
* Select IAM, create a User (note down the credentials for the user (`ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`))
* Add a policy to the User granting `"dynamodb:UpdateItem"` on your table. The policy will look similar to this:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "dynamodb:UpdateItem"
            ],
            "Resource": "arn:aws:dynamodb:*:*:table/tracking"
        }
    ]
}
```
* Create the table with primary partition key (HASH) with name `page` and type `S` and secondary key `date` also of type `S`
* If you want to play around locally you would need to install aws cli and create a config + credentials file for this user
* As next step we will share the credentials inside netlify. Go to your site > Settings > Build & Deploy > Environment. There create two variables holding the AWS credentials. I named them `KEY_ID` and `SECRECT_ACCESS_KEY`. Note that you cannot use `AWS_` prefixes. 

## Tracking function

I'm using the following code inside of the function to increment the counter by one on every call to the function. Don't be afraid if you have never seen any DynamoDB code. It's using the `updateItem` operation with `ADD` as the UpdateExpression. If there is no item in the database which matches the keys a new one is created where the count field will be 0 (and then incremented to 1).

Note that I have to manually pass the credentials to the DynamoDB instance. To mark the page I'm leveraging the query parameters of the function, so calls will look like: `yoursite.com/.netlify/functions/hit?page=your-page`

```javascript
const DynamoDB = require("aws-sdk").DynamoDB

const dynamoDB = new DynamoDB({
  region: "eu-west-1",
  accessKeyId: process.env.KEY_ID,
  secretAccessKey: process.env.SECRECT_ACCESS_KEY,
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
    body: "OK",
  }
}
```

Add this to `src/lambda/hit.js` and run `yarn add aws-sdk` inside `src/lambda` folder. Deploy the function and test with manual requests if the counters get updated in DynamoDB (check out via aws console). Note: For me it's enough to be able to check stats in aws console, so I won't guide further than storing the data.

## Hooking up the tracking

I'm using Gatsby as engine for creating the page. It is based on react, so I'm writing a custom react hook to call my function:

```javascript
import { useEffect } from "react"

export const useTracking = page =>
  useEffect(() => {
    const trackHit = async () => {
      try {
        await fetch(`/.netlify/functions/hit?page=${page}`)
      } catch (e) {}
    }
    trackHit()
  }, [page])

```

It takes a page parameter and calls the function with it via http (based on fetch api).
This hook now can be used in all pages to track hits. Added to the remark content of the blog this might look like:

```javascript
  import { useTracking } from "../tracking/tracking" 

  const Talks = props => {
    useTracking("/talks")
    ...
  }
```

Note that your React components need to be function components to work with hooks. You can also do this without hooks on `componentDidMount`.

That's it! Commit, push, deploy and test it. You should now see the test hits you're generating in DynamoDB. Afterwards reset the DynamoDB to be empty and let traffic flow in.

Note: All code is in the [Github Sources](https://github.com/martinlechner1/blog) of this blog.

If you have any questions or want to provide feedback (I'd be very happy), feel free to reach out via twitter: [@m4nl5r](https://twitter.com/m4nl5r)
