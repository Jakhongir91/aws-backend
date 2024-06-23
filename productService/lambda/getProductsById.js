module.exports.handler = async (event) => {
    const productId = event["pathParameters"]["product_id"];
    console.log(productId);
    let products = require("./mock/products");
    let array = products.products;

    let product = array.find(item => item.id == productId);

    if (product !== undefined) {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*", // Allow from anywhere
                "Access-Control-Allow-Methods": "GET" // Allow only GET request
            },
            body: JSON.stringify(product)
        };
    }

    return {
        statusCode: 404,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*", // Allow from anywhere
            "Access-Control-Allow-Methods": "GET" // Allow only GET request
        },
        body: JSON.stringify("Product not found.")
    };
};