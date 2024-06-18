# Task 3.1
- [x] Product Service contains configuration for 2 lambda functions. API is working
  * [Products list](https://m1xge546pb.execute-api.us-east-1.amazonaws.com/prod/products)
  * [Get product by id](https://m1xge546pb.execute-api.us-east-1.amazonaws.com/prod/products/1)
- [x] Both lambda functions getProductsById AND getProductsList return a correct response code
- [ ] Frontend application is integrated with Product Service (/products API)

# Additional (optional) task
- [x] ***+7.5*** - Swagger documentation is created. File openapi.yaml in productService folder
- [x] ***+7.5*** - Main error scenarios are handled by API ("Product not found" error)    
## Useful commands

* `npm run test`         perform the jest unit tests
* `npx cdk deploy`       deploy this stack to your default AWS account/region
* `npx cdk diff`         compare deployed stack with current state
* `npx cdk synth`        emits the synthesized CloudFormation template
