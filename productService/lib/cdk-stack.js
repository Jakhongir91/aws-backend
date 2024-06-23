const { Stack, Duration } = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const apiGateway = require('aws-cdk-lib/aws-apigateway');
const {LambdaIntegration} = require("aws-cdk-lib/aws-apigateway");

class CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const productListFunction = new lambda.Function(this, 'getProductsList', {
      runtime: lambda.Runtime.NODEJS_20_X, // Choose any supported Node.js runtime
      code: lambda.Code.fromAsset('lambda'), // Points to the lambda directory
      handler: 'getProductsList.handler', // Points to the 'hello' file in the lambda directory
    });

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
