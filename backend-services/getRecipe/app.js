const AWS = require('aws-sdk');

const { TABLE_NAME, REGION } = process.env;
const options = { region: REGION };
AWS.config.update({ region: REGION });
let dynamodb = new AWS.DynamoDB.DocumentClient(options);

function isValidRequest(event) {
    if (event !== null && event.pathParameters != null && event.pathParameters.recipeId !== null) {
        return /^[\w-]+$/.test(event.pathParameters.recipeId);
    }
    return false;
}
const response = (statusCode, body, additionalHeaders) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      ...additionalHeaders,
    }
});

const getRecipeById = async (recipeId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            'id': recipeId
        }
    }
    return dynamodb.get(params).promise();
}

exports.getRecipeItem = async (event) => {
    if (!isValidRequest(event)) {
        return response(400, { message: 'Error: Invalid request: ' + JSON.stringify(event) });
    }
    try {
        const data = await getRecipeById(event.pathParameters.recipeId);
        return response(200, data);
    } catch (err) {
        return response(400, { message: err.message });
    }
};