module.exports.handler = async (event) => {
    // let products = require("./mock/products.js");
    // console.log(products);
    // console.log(JSON.stringify(products));

    return {
        statusCode: 200,
        body: JSON.stringify([
            {
                "id": 1,
                "name": "Iphone 14",
                "price": 100
            },
            {
                "id": 2,
                "name": "Apple whatch",
                "price": 200
            },
            {
                "id": 3,
                "name": "IPhone headphones",
                "price": 300
            }
        ])
    };
};