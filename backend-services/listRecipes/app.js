const AWS = require('aws-sdk');
const { TABLE_NAME, REGION } = process.env;
const options = { region: REGION };
AWS.config.update({ region: REGION });

let dynamodb = new AWS.DynamoDB.DocumentClient(options);

const response = (statusCode, body, additionalHeaders) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      ...additionalHeaders,
    },
});

async function getRecipes() {
    return dynamodb.scan({
        TableName: TABLE_NAME
    }).promise().then(result => result.Items);
}

exports.listRecipes = async () => {
    try {
        const data = await getRecipes();
        // sort from most recent to least recent
        const sortedData = data.sort((a, b) => {
            if (a.createdDate < b.createdDate) {
                return 1;
            } else if (a.createdDate > b.createdDate) {
                return -1;
            }
            return 0;
        })
        return response(200, sortedData);
    } catch (err) {
        return response(400, { message: err.message });
    }
}