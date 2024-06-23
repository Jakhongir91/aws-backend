module.exports.handler = async (event) => {
    let products = require("./mock/products.js");

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*", // Allow from anywhere
            "Access-Control-Allow-Methods": "GET" // Allow only GET request
        },
        body: JSON.stringify(products.products)
    };
};