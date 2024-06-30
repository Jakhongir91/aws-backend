const { DynamoDBClient } = require( "@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);


exports.handler = async (event, context, callback) => {
    const command = new ScanCommand({
        ProjectionExpression: "#Name, Color, AvgLifeSpan",
        ExpressionAttributeNames: { "#Name": "Name" },
        TableName: "products",
    });

    const response = await docClient.send(command);
};