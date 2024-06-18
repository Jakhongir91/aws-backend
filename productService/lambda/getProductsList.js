module.exports.handler = async (event) => {
    let products = require("./mock/products.js");

    return {
        statusCode: 200,
        body: JSON.stringify(products)
    };
};