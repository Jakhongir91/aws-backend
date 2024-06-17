const { Stack, Duration } = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const apiGateway = require('aws-cdk-lib/aws-apigateway');

class CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const productListFunction = new lambda.Function(this, 'ProductListLambda', {
      runtime: lambda.Runtime.NODEJS_20_X, // Choose any supported Node.js runtime
      code: lambda.Code.fromAsset('lambda'), // Points to the lambda directory
      handler: 'productList.handler', // Points to the 'hello' file in the lambda directory
    });

    const api = new apiGateway.LambdaRestApi(this, 'ProductListApi', {
      handler: productListFunction,
      proxy: false,
    });

    // Define the '/products' resource with a GET method
    const helloResource = api.root.addResource('products');
    helloResource.addMethod('GET');
  }
}

module.exports = { CdkStack }
