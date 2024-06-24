const AWS = require("aws-sdk");
const config = require("../config.js");

AWS.config.update(config.aws_remote_config);

const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10"});

const items = {
    RequestItems: {
        "products": [
            {
                PutRequest: {
                    Item: {
                        "id": {
                            S: "uuid-1"
                        },
                        "title": {
                            S: "Mac Book Pro"
                        },
                        "description": {
                            S: "Very expensive fancy laptop"
                        },
                        "price": {
                            N: "1200"
                        }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "id": {
                            S: "uuid-2"
                        },
                        "title": {
                            S: "IPhone 14"
                        },
                        "description": {
                            S: "Expensive smartphone with excellent camera"
                        },
                        "price": {
                            N: "1100"
                        }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "id": {
                            S: "uuid-3"
                        },
                        "title": {
                            S: "Apple Pods 2"
                        },
                        "description": {
                            S: "Sophisticated and stylish headphones"
                        },
                        "price": {
                            N: "250"
                        }
                    }
                }
            }
        ]
    }
};

ddb.batchWriteItem(items, function (err, data) {
    if (!err) {
        console.log("Putting items ERROR")
        console.log(data);
    }
    else {
        console.log("ITEMS HAS BEEN WRITTEN SUCCESSFULLY");
        console.log(err, err.stack);
    }
});