const AWS = require('aws-sdk');
const { v1: uuidv1 } = require("uuid");

// environment variables
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

function isValidRequest(event) {
    return event.body !== null;
}

async function createRecipe(event) {
    const dISO = new Date().toISOString();
    const auto_fields = {
        id: uuidv1(),
        createdDate: dISO,
        lastUpdated: dISO
    };
    const supplied_fields = JSON.parse(event.body);
    const required_fields = {
        title: supplied_fields.title || '',
    };

    const itemBody = {
        ...auto_fields,
        ...supplied_fields,
        ...required_fields
    };

    console.log(itemBody);

    const params = {
        TableName: TABLE_NAME,
        Item: itemBody
    };
    await dynamodb.put(params).promise();
    return itemBody;
}

exports.createRecipeItem = async (event, context) => {
    if (!isValidRequest(event)) {
        return response(400, { message: 'Error: Invalid request: ' + JSON.stringify(event) });
    }

    try {
        const data = await createRecipe(event);
        return response(200, data);
    } catch (err) {
        return response(400, { message: err.message });
    }
}