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
    }
});

function isValidRequest(event) {
    if (event !== null && event.pathParameters !== null && event.pathParameters.recipeId !== null) {
        return /^[\w-]+$/.test(event.pathParameters.recipeId) && event.body;
    }
    return false;
}

async function updateRecipe(recipeId, updates) {
    const dISO = new Date().toISOString();
    const updatesFormatted = Object.keys(updates).reduce((memo, key) => {
        memo[key] = {
            Action: 'PUT',
            Value: updates[key]
        };
        return memo;
    }, {});
    updatesFormatted['lastUpdated'] = {
        Action: 'PUT',
        Value: dISO
    };
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: recipeId
        },
        AttributeUpdates: {
            ...updatesFormatted
        }
    }
    return dynamodb.update(params).promise();
}

exports.updateRecipeItem = async (event, context) => {
    if (!isValidRequest(event)) {
        return response(400, { message: 'Error: Invalid request: ' + JSON.stringify(event) });
    }

    try {
        const data = await updateRecipe(event.pathParameters.recipeId, JSON.parse(event.body));
        return response(200, data);
    } catch (err) {
        return response(400, { message: err.message });
    }
}