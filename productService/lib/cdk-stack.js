const { Stack, Duration } = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const apiGateway = require('aws-cdk-lib/aws-apigateway');
const {LambdaIntegration} = require("aws-cdk-lib/aws-apigateway");
const AWS = require("aws-sdk");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const {RemovalPolicy} = require("@aws-cdk/core");
const {data} = require("aws-cdk/lib/logging");
const {iam} = require("@aws-cdk/aws-iam");

class CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create the DynamoDB service object
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10", });
    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);
    const params = {
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      TableName: "products",
      StreamSpecification: {
        StreamEnabled: false,
      },
    };
    // Call DynamoDB to create the table
    ddb.createTable(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Table Created", data);
      }
    });
    console.log("TABLE NAME TABLE NAME TABLE NAME TABLE NAME TABLE NAME TABLE NAME ");
    console.log(data.tableName);



    const productListFunction = new lambda.Function(this, 'getProductsList', {
      runtime: lambda.Runtime.NODEJS_20_X, // Choose any supported Node.js runtime
      code: lambda.Code.fromAsset('lambda'), // Points to the lambda directory
      handler: 'getProductsList.handler', // Points to the 'hello' file in the lambda directory
      environment: {
        PRODUCTS_TABLE_NAME: data.tableName,
        // COGNITO_PUBLIC_KEY: // not relevant
      }
    });
    console.log("IAM");
    console.log(iam);
    // return;
    const accessPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "dynamodb:*"                            ]
    });
    accessPolicy.addAllResources();
    productListFunction.addToRolePolicy(accessPolicy)

    const productByIdFunction = new lambda.Function(this, 'getProductsById', {
      runtime: lambda.Runtime.NODEJS_20_X, // Choose any supported Node.js runtime
      code: lambda.Code.fromAsset('lambda'), // Points to the lambda directory
      handler: 'getProductsById.handler',
    });

    const api = new apiGateway.LambdaRestApi(this, 'ProductListApi', {
      handler: productListFunction,
      proxy: false,
    });

    // Define the '/products' resource with a GET method
    const productsResource = api.root.addResource('products');
    productsResource.addMethod('GET');

    const productResource = productsResource.addResource('{product_id}');
    productResource.addMethod('GET', new LambdaIntegration(productByIdFunction));
  }
}

module.exports = { CdkStack }
